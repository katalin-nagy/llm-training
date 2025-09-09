import React from 'react';

interface TextareaFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const TextareaField: React.FC<TextareaFieldProps> = ({ label, ...props }) => {
  return (
    <div>
      <label
        htmlFor={props.id || props.name}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="mt-1">
        <textarea
          {...props}
          className="appearance-none block w-full px-3 py-2 bg-gray-100 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm"
        />
      </div>
    </div>
  );
};

export default TextareaField;
