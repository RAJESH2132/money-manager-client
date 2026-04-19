import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const Input = ({
  label,
  value,
  onChange,
  placeholder,
  type,
  isSelect,
  options,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="mb-4">
      <label className="text-[13px] text-slate-800 block mb-1">{label}</label>
      <div className="relative">
        {isSelect ? (
          <select
            value={value}
            onChange={(e) => onChange(e)}
            className="w-full bg-transparent outline-none border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading focus:outline-none focus:border-blue-500"
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            className="hide-password-toggle w-full bg-transparent outline-none border border-gray-300 rounded-md py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
            type={
              type === "password" ? (showPassword ? "text" : "password") : type
            }
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        )}
        {type === "password" && (
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <Eye size={20} className="text-primary" />
            ) : (
              <EyeOff size={20} className="text-slate-400" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
