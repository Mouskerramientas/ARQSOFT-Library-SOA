import Spinner from "./Spinner";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button = ({
  children,
  onClick = () => {},
  disabled = false,
  loading = false,
  type = "button",
}: Props) => {
  return (
    <button
      className="flex flex-row items-center justify-center cursor-pointer gap rounded-md px-4 py-2 bg-black shadow-md text-white focus:scale-105 hover:scale-105 duration-300"
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
};

export default Button;
