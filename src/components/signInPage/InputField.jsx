// src/components/InputField.js

import React from "react";

const InputField = ({ label, type = "text", placeholder = "" }) => {
  return (
    <div className="mb-6">
      <label className="mb-2 block text-lg">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded border border-gray-300 p-2"
      />
    </div>
  );
};

export default InputField;
