import { useCallback, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import SearchAddress from "./components/SearchAddress";
import Toast from "./components/Toast";
import TransactionsList from "./components/TransactionsList";
import TransactionsListLoader from "./components/TransactionsListLoader";
import { AppStyle } from "./constants/Classnames";
import useEthereumManager from "./hooks/useEthereumManager";

function App() {
  const [isTableScrolling, setIsTableScrolling] = useState<boolean>(false);

  const {
    walletAddress,
    updateAddress,
    isAddressValid,
    fetchTransactions,
    loading,
    walletTransactions,
    APIMessage,
    hasMoreTransactions,
  } = useEthereumManager();

  const onTableScroll = useCallback((isScrolling: boolean) => {
    setIsTableScrolling(isScrolling);
  }, []);

  return (
    <div className={AppStyle}>
      <Toast message={APIMessage} />
      <Header />
      <SearchAddress
        walletAddress={walletAddress}
        updateAddress={updateAddress}
        isAddressValid={isAddressValid}
        fetchTransactions={fetchTransactions}
        loading={loading}
        isTableScrolling={isTableScrolling}
        hasMoreTransactions={hasMoreTransactions}
      />
      <TransactionsList
        walletTransactions={walletTransactions}
        loading={loading}
        fetchTransactions={fetchTransactions}
        onTableScroll={onTableScroll}
      />
      <TransactionsListLoader
        loading={loading}
        walletTransactions={walletTransactions}
      />
    </div>
  );
}

export default App;
