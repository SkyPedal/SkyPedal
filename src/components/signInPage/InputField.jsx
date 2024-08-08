// src/components/InputField.js

import React from "react";

const InputField = ({ label, type = "text", placeholder = "" }) => {
  return (
    <div className="mb-6">
      <label className="block text-lg mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>
  );
};

export default InputField;
