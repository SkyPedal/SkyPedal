const Button = ({ children, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`rounded bg-gray-300 p-2 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
