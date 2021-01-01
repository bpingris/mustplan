import styles from "./Button.module.css";

export default function Button({
  children,
  kind = "primary",
  size = "normal",
  type = "button",
  className = "",
  onClick,
  loading = false,
}) {
  const classes = {
    primary:
      "bg-blue-600 hover:bg-blue-700 focus:ring-offset-blue-200 focus:ring-blue-500 text-white",
    secondary: "border-gray-400 focus:border-gray-700",
    danger:
      "bg-red-700 hover:bg-red-800 focus:ring-offset-red-300 focus:ring-red-600 text-white",
  }[kind];

  const sizeClasses = {
    small: "px-3 py-1 text-sm",
    normal: "px-4 py-2 text-base",
  }[size];

  const loadingClass = loading ? styles.loading : "";

  return (
    <button
      type={type}
      className={`border border-transparent w-full font-semibold flex items-center justify-center transition duration-200 ease-in rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${classes} ${sizeClasses} ${loadingClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
