export default function Input({
  placeholder = "",
  required,
  label,
  name = "",
  value,
  onInput,
}) {
  return (
    <div className="relative">
      {label && (
        <label htmlFor={name} className="text-gray-700">
          {label}
          {required && <span className="text-red-500 required-dot">*</span>}
        </label>
      )}
      <input
        type="text"
        className="flex-1 w-full px-4 py-1 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent"
        name={name}
        placeholder={placeholder}
        value={value}
        onInput={onInput}
      />
    </div>
  );
}
