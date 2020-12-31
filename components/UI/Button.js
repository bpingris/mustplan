export default function Button({
  children,
  kind = "primary",
  size = "normal",
  type = "button",
  className = "",
  onClick,
}) {
  const classes = {
    primary:
      "bg-blue-600 hover:bg-blue-700 focus:ring-offset-blue-200 focus:ring-blue-500 text-white",
    secondary: "border-gray-400 focus:border-gray-700",
    danger:
      "bg-red-600 hover:bg-red-700 focus:ring-offset-red-200 focus:ring-red-500 text-white",
  }[kind];

  const sizeClasses = {
    small: "px-3 py-1 text-sm",
    normal: "px-4 py-2 text-base",
  }[size];

  return (
    <button
      type={type}
      className={`border border-transparent w-full font-semibold text-center transition duration-200 ease-in rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${classes} ${sizeClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
