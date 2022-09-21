import { LOAD_MORE_TEXT } from "../constants/Content";

type TransactionsListLoaderTypes = {
  loading: boolean;
  walletTransactions: any;
};

const TransactionsListLoader = ({
  loading,
  walletTransactions,
}: TransactionsListLoaderTypes) => (
  <div className="h-16">
    {loading && walletTransactions?.length ? (
      <p className="text-md flex flex-row justify-center mb-10">
        {LOAD_MORE_TEXT}
      </p>
    ) : (
      <></>
    )}
  </div>
);

export default TransactionsListLoader;
