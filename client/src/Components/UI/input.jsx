import React from "react";

const Input = ({ label, name, register, error, ...rest }) => {
  return (
    <>
      <div>
        <label className="block text-sm mb-1">{label}</label>
        <input
          className="w-full p-[5px] rounded border-1 border-[#474C59] bg-transparent  placeholder:text-base placeholder:font-medium "
          {...rest}
          {...(register ? register(name) : {})}
        />
        {error?.[name] && (
          <p className="mt-2 text-sm text-red-600">{error[name]?.message}</p>
        )}
      </div>
    </>
  );
};

export default Input;
