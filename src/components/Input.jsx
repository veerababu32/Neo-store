import React, { useId } from 'react';

const Input = React.forwardRef(function Input(
  { label, type = 'text', className = '', ...props },
  ref
) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block mt-2 font-bold text-sm text-[#666666]"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        ref={ref}
        type={type}
        className={`w-full h-5 px-3 py-5 bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 rounded-md${className}`}
        {...props}
      />
    </div>
  );
});

export default Input;
