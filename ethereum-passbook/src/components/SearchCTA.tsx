import {
  SearchActiveLoaderStyle,
  SearchButtonStyle,
} from "../constants/Classnames";
import { GET_TRANSACTIONS, NO_TRANSACTIONS } from "../constants/Content";
import Loader from "./Loader";

type SearchCTATypes = {
  loading: boolean;
  isTableScrolling: boolean;
  isAddressValid: boolean;
  hasMoreTransactions: boolean;
  fetchTransactions(): void;
};

const SearchCTA = ({
  loading,
  isTableScrolling,
  isAddressValid,
  hasMoreTransactions,
  fetchTransactions,
}: SearchCTATypes) => {
  return loading && !isTableScrolling ? (
    <Loader classname={SearchActiveLoaderStyle} />
  ) : (
    <button
      className={SearchButtonStyle}
      disabled={!isAddressValid || !hasMoreTransactions}
      onClick={fetchTransactions}
    >
      {!hasMoreTransactions ? NO_TRANSACTIONS : GET_TRANSACTIONS}
    </button>
  );
};

export default SearchCTA;
