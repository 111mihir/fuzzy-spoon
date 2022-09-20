import { FormEvent, useCallback, useState } from "react";
import web3 from "web3";
import {
  ETHSCAN_API_ENDPOINT,
  ETHSCAN_GET_TRANSACTIONS_API_ENDPOINT,
} from "../constants";
import { persistTransactions } from "./useAPI";

type address = string;

export type transaction = {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: number;
  blockHash: string;
  transactionIndex: number;
  from: string;
  to: string;
  value: number;
  gas: string;
  gasPrice: string;
  isError: string;
  txreceipt_status: string;
  input: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  gasUsed: string;
  confirmations: string;
  methodId: string;
  functionName: string;
};

const useEthereumManager = () => {
  // state for user's input
  const [walletAddress, setWalletAddress] = useState<address | "">(
    "" as address
  );
  // state for address's validity
  const [isAddressValid, setIsAddressValid] = useState<boolean>(true);
  // state for list of transactions
  const [walletTransactions, setWalletTransactions] = useState<transaction[]>(
    []
  );
  // current page number of the transactions
  const [pageNumber, setPageNumber] = useState<number>(1);
  // state for loading status
  const [loading, setLoading] = useState<boolean>(false);
  // state for error and other messages
  const [APIMessage, setAPIMessage] = useState<string>("");

  // used to clear list when a new address is added and searched for
  const [shouldClearList, setShouldClearList] = useState<boolean>(false);
  // used to disable fetching more data on scroll when end of list has been reached
  const [hasMoreTransactions, setHasMoreTransactions] = useState<boolean>(true);

  /**
   * @function isValidAddress checks if provided address is valid
   * @param address address to be checked
   */
  const isValidAddress = useCallback(
    (address: any) => web3.utils.isAddress(address),
    []
  );

  /**
   * @function updateAddress updates the address state
   * @param event input event
   */
  const updateAddress = useCallback(
    (input: FormEvent<HTMLInputElement>): void => {
      // validate the input
      if (
        !input ||
        !input.target ||
        input.currentTarget.value === walletAddress
      ) {
        return;
      }

      // update the address state
      setWalletAddress(input.currentTarget.value);

      // check if address is valid
      setIsAddressValid(
        !input.currentTarget.value
          ? true
          : isValidAddress(input.currentTarget.value)
      );

      // clear the list of transactions if entered address is valid and not the same as current address
      // this is to prevent mixing transaction data across addresses
      if (
        isValidAddress(input.currentTarget.value) &&
        input.currentTarget.value !== walletAddress
      ) {
        setShouldClearList(true);
        setHasMoreTransactions(true);
      }
    },
    [isValidAddress, walletAddress]
  );

  /**
   * @function fetchTransactions fetches transactions for provided address
   */
  const fetchTransactions = useCallback(async () => {
    // avoid making a request if we've already fetched all transactions
    if (!hasMoreTransactions) {
      return;
    }

    // activate the loader
    setLoading(true);

    // useful when we're fetching transactions for a new address but we already have transactions data of another address
    if (shouldClearList) {
      setWalletTransactions([]);
      setShouldClearList(false);
    }

    // fetch transactions from etherscan
    const requestURL = `${ETHSCAN_API_ENDPOINT}${ETHSCAN_GET_TRANSACTIONS_API_ENDPOINT}&page=${pageNumber}&address=${walletAddress}`;
    const options = {};

    const response: any = await fetch(requestURL, options);

    if (!response.ok || response.error) {
      if (response.message) {
        setAPIMessage(response.message);

        // clear message after 5 seconds
        setTimeout(() => {
          setAPIMessage("");
        }, 5000);
      }
    }

    // parse the response to JSON
    const parsedResponse: any = await response.json();

    // if response contains transactions, append to the list
    if (parsedResponse?.result?.length) {
      // persist new transactions to database
      await persistTransactions(parsedResponse.result);

      // update the local list of transactions
      setWalletTransactions((prevState) => [
        ...prevState,
        ...parsedResponse.result,
      ]);
      // increment page number
      setPageNumber((pageNumber) => pageNumber + 1);
    } else {
      // if this is an API call for the first page with no results, we may want to show a message to the user
      if (parsedResponse.message) {
        setAPIMessage(parsedResponse.message);

        // clear the toast message after 5 seconds
        setTimeout(() => {
          setAPIMessage("");
        }, 5000);
      }

      // if there are no more transactions to fetch, set the flag to false
      if (parsedResponse.status === "0") {
        setHasMoreTransactions(false);
      }
    }

    // deactivate the loader
    setLoading(false);
  }, [pageNumber, walletAddress, shouldClearList, hasMoreTransactions]);

  return {
    walletAddress,
    fetchTransactions,
    isValidAddress,
    updateAddress,
    isAddressValid,
    walletTransactions,
    loading,
    APIMessage,
    hasMoreTransactions,
  };
};

export default useEthereumManager;
