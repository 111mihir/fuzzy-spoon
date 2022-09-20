import {
  InputContainerStyle,
  SearchAddressStyle,
} from "../constants/Classnames";
import InputErrorMessage from "./InoutErrorMessage";
import SearchCTA from "./SearchCTA";
import TextInput from "./TextInput";

type SearchAddressTypes = {
  updateAddress(props?: any): void;
  walletAddress: string;
  isAddressValid: boolean;
  fetchTransactions(): void;
  loading: boolean;
  isTableScrolling: boolean;
  hasMoreTransactions: boolean;
};

const SearchAddress = ({
  updateAddress,
  walletAddress,
  isAddressValid,
  fetchTransactions,
  loading,
  isTableScrolling,
  hasMoreTransactions,
}: SearchAddressTypes) => {
  return (
    <div className={SearchAddressStyle}>
      <div className={InputContainerStyle}>
        <TextInput
          walletAddress={walletAddress}
          isAddressValid={isAddressValid}
          onChange={updateAddress}
        />
        <InputErrorMessage isAddressValid={isAddressValid} />
      </div>
      <SearchCTA
        loading={loading}
        isTableScrolling={isTableScrolling}
        isAddressValid={isAddressValid}
        hasMoreTransactions={hasMoreTransactions}
        fetchTransactions={fetchTransactions}
      />
    </div>
  );
};

export default SearchAddress;
