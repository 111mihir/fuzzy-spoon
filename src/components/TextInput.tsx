import {
  InputErrorStyle,
  InputStyle,
  InputSuccessStye,
} from "../constants/Classnames";
import { INPUT_PLACEHOLDER } from "../constants/Content";

type TextInputTypes = {
  isAddressValid: boolean;
  walletAddress: string;
  onChange(props?: any): void;
};

const TextInput = ({
  isAddressValid,
  onChange,
  walletAddress,
}: TextInputTypes) => {
  const inputClassNames = `${InputStyle} ${
    !isAddressValid
      ? InputErrorStyle
      : walletAddress.length
      ? InputSuccessStye
      : ""
  }`;

  return (
    <input
      className={inputClassNames}
      type="text"
      id="address"
      name="wallet_address"
      required
      onChange={onChange}
      value={walletAddress}
      placeholder={INPUT_PLACEHOLDER}
    />
  );
};

export default TextInput;
