'use client'

import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface InputProps {
  type: string
  name: string,
  label: string,
  placeholder: string,
  register: UseFormRegister<any>,
  error?: string,
  rules?: RegisterOptions
}

export default function Input({ type, name, label, placeholder, register, error, rules }: InputProps) {
  return (
    <div className="mb-3">
      {label && (
        <label
          htmlFor={name}
          className="text-lg font-medium mb-1"
        >
          {label}
        </label>
      )}
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name, rules)}
        className="w-full border-1 rounded h-11 py-2 px-3"
      />
      { error && <span className="text-red-500 text-sm my-1 py-3">{error}</span> }
    </div>
  )
}