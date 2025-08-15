'use client'

import { RegisterOptions, UseFormRegister } from 'react-hook-form'
import AddAuxiliaryItem from '@/components/AddAuxiliaryItem'

interface SelectOption {
  id: number,
  description: string
}

interface SelectProps {
  name: string,
  label: string,
  options: SelectOption[],
  register: UseFormRegister<any>,
  error?: string,
  rules?: RegisterOptions,
  addItem?: boolean,
  itemData?: {
    title: string,
    api_url: string,
    onAdd?: () => void | Promise<void>
  }
}

export default function Select({ name, label, options, error, rules, register, addItem, itemData }: SelectProps) {
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
        {...register(name, rules)}
        className="mt-1 block w-full px-3 py-2 min-h-[42px] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.description}
          </option>
        ))}
      </select>
      <div className="flex items-center justify-between my-1">
        { error && <span className="text-red-500 text-sm">{error}</span>}
        <div className="ml-auto">
          {addItem && <AddAuxiliaryItem itemData={itemData}  /> }
        </div>
      </div>
    </div>
  )
}
