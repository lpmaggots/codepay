'use client'

import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  name: string
  label: string
  options: SelectOption[]
  // register: UseFormRegister<any>
  error?: string
  rules?: RegisterOptions
}

export default function Select({ name, label, options, error, rules }: SelectProps) {
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
      <select
        id={name}
        name={name}
        // {...register(name, rules)}
        className="mt-1 block w-full px-3 py-2 min-h-[42px] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="text-red-500 text-sm my-1 py-3">{error}</span>}
    </div>
  )
}
