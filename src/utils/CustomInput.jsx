/* eslint-disable react/prop-types */
import { Input } from "antd";

const CustomInput = ({ 
  icon: Icon, 
  placeholder, 
  className, 
  type = "text", 
  isPassword = false, 
  isTextArea = false, 
  isFile = false, // Add a flag for file input
  rows = 4, 
  name, // Add a name prop for the input field
  ...rest 
}) => {
  return (
    <div className="w-full">  
      <div className="relative">
        {/* Render TextArea if isTextArea is true */}
        {isTextArea ? (
          <Input.TextArea
            placeholder={placeholder || "Enter text"} // Dynamic placeholder for TextArea
            rows={rows} // Number of rows for TextArea
            className={`w-full px-4 py-2 text-[16px] border border-[#0a0a0a] text-[#0a0a0a] rounded-lg resize-none ${className}`} // Custom styling
            {...rest} // Additional props
          />
        ) : isPassword ? (
          <Input.Password
            prefix={Icon && <Icon className="text-[#0a0a0a] text-xl" />} // Dynamic icon
            placeholder={placeholder || "Enter password"} // Dynamic placeholder for Password
            className={`w-full px-4 py-2 text-[16px] border border-[#0a0a0a] text-[#0a0a0a] rounded-lg ${className}`}
            {...rest} // Additional props
          />
        ) : isFile ? ( // Render file input if isFile is true
          <input
            type="file"
            name={name} // Add the name attribute to the file input
            className={`w-full px-4 py-2 text-[16px] border border-[#0a0a0a] text-[#0a0a0a] rounded-lg ${className}`} // Custom styling
            accept="image/*"
            {...rest} // Additional props
          />
        ) : (
          <Input
            prefix={Icon && <Icon className="text-[#4C7E95] text-xl" />} // Dynamic icon
            placeholder={placeholder || "Enter value"} // Dynamic placeholder
            className={`w-full px-4 py-2 text-[16px] border border-[#000000] text-[#000000] rounded-lg ${className}`}
            type={type} // Default input type
            {...rest} // Additional props
          />
        )}
      </div>
    </div>
  );
};

export default CustomInput;
