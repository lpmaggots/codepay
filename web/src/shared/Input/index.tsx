'use client'

import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface InputProps {
  type: string
  name: string,
  label: string,
  placeholder: string,
  // register: UseFormRegister<any>,
  error?: string,
  rules?: RegisterOptions
}

export default function Input({ type, name, label, placeholder, error, rules }: InputProps) {
  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        // {...register(name, rules)}
        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
      />
      { error && <span className="text-red-500 text-sm my-1 py-3">{error}</span> }
    </div>
  )
}