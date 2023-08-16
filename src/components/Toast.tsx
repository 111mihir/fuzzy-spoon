// test
// accepts a message and displays it in a toast

type ToastProp = {
  message: string;
};

const Toast = ({ message }: ToastProp) => {
  return message.length ? (
    <div className="absolute top-36 right-25 z-50 w-1/3 h-12 bg-black justify-center  items-center flex rounded-lg opacity-80">
      <p className="text-lg">{message}</p>
    </div>
  ) : (
    <></>
  );
};

export default Toast;
