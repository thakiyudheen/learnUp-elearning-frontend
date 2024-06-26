import React, { useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useTheme } from '../../ui/theme-provider';

interface InputFieldProps {
  type: string;
  placeholder: string;
  value?: string;
  name: string;
  defaultValue?: string ;
  background?: string;
  disabled?:boolean;
}

const InputField: React.FC<InputFieldProps> = ({ type, placeholder, value, name ,defaultValue, background,disabled
 }) => {
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  console.log('this is default value',defaultValue)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='flex flex-col relative'>
      <Field
        className={`w-full px-2 py-1 ${theme === 'light' ? 'bg-white' : (background ? background : 'bg-gray-800')} border-b-[1px] focus:outline-none rouded-lg ${theme != 'light' ? 'border-gray-600' :'border-gray-800'}`}
        type={showPassword ? 'text' : type}
        placeholder={placeholder}
        value={value}
        id={name}
        name={name}
        defaultValue={defaultValue || ""}
        disabled={disabled}
        
      />
      {type === 'password' && (
        <button
          type="button"
          className="absolute right-2 top-2"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      )}
      <ErrorMessage
        className="text-xs font-semibold text-red-500"
        name={name}
        component="small"
      />
    </div>
  );
};

export default InputField;
