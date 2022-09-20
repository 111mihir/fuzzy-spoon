import { InputErrorMessageStyle } from "../constants/Classnames";
import { INPUT_ERROR_MESSAGE } from "../constants/Content";

type InputErrorMessageTypes = {
  isAddressValid: boolean;
};

const InputErrorMessage = ({ isAddressValid }: InputErrorMessageTypes) => {
  return !isAddressValid ? (
    <p className={InputErrorMessageStyle}>{INPUT_ERROR_MESSAGE}</p>
  ) : (
    <></>
  );
};

export default InputErrorMessage;
