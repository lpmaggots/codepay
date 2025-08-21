'use client'

import { RegisterOptions, UseFormRegister } from 'react-hook-form'
import AddAuxiliaryItem from '@/components/AddAuxiliaryItem'

interface SelectOption {
  value: string | number,
  description: string
}

interface SelectProps {
  name: string,
  label?: string,
  hasPlaceholder?: boolean,
  value?: string | number,
  options: SelectOption[],
  register?: UseFormRegister<any>,
  error?: string,
  rules?: RegisterOptions,
  addItem?: boolean,
  itemData?: {
    title: string,
    api_url: string,
    onAdd?: () => void | Promise<void>
  }
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export default function Select({ name, label, options, error, rules, register, addItem, itemData, onChange, value, hasPlaceholder = false }: SelectProps) {
  return (
     <div>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        id={name}
        value={value}
        onChange={(e) => {
          register?.(name, rules)?.onChange?.(e)
          onChange?.(e)
        }}
        className="mt-1 block w-full px-3 py-2 min-h-[42px] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
      >
        { hasPlaceholder && <option value="">Selecione uma opção</option> }
        {options.map((option, index) => (
          <option key={index} value={option.value}>
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
