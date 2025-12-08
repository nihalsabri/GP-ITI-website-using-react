import React from "react";

import { useSelector } from "react-redux";

const Input = ({ type, name, placeholder, onChange, value, className }) => {
  const theme = useSelector((state) => state.theme.mode);

  return (
    <>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className={`${className} ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}
      />
    </>
  );
};

export default Input;
