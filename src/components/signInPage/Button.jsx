

const Button = ({ children, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-gray-300 p-2 rounded ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
