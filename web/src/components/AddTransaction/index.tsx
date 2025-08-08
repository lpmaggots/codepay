'use client'

import { useState } from 'react'
import { PlusCircle } from 'lucide-react'
import Modal from '@/shared/Modal'
import Input from '@/shared/Input'
import Select from '@/shared/Select'
import Button from '@/shared/Button'
import { Tooltip } from 'react-tooltip'

export default function AddTransaction() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Transação adicionada!')
    handleCloseModal()
  }

  return (
    <>
      <Button id="add-transaction-button" variant="floating" onClick={handleOpenModal}>
        <PlusCircle size={32} />
      </Button>
      <Tooltip anchorSelect="#add-transaction-button" place="left">
        Adicionar Transação
      </Tooltip>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Adicionar Nova Transação">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            name="description"
            label="Descrição"
            placeholder="Ex: Compras no supermercado"
          />
          <Input
            type="number"
            name="amount"
            label="Valor"
            placeholder="0.00"
          />
          <Select
            name="type"
            label="Tipo"
            options={[
              { value: 'receita', label: 'Receita' },
              { value: 'despesa', label: 'Despesa' },
            ]}
          />
          <Input
            type="date"
            name="date"
            label="Data"
            placeholder='DD/MM/AAAA'
          />
          <Select
            name="category"
            label="Categoria"
            options={[
              { value: 'alimentacao', label: 'Alimentação' },
              { value: 'transporte', label: 'Transporte' },
              { value: 'moradia', label: 'Moradia' },
              { value: 'salario', label: 'Salário' },
              { value: 'investimento', label: 'Investimento' },
              { value: 'outros', label: 'Outros' },
            ]}
          />
          <div className="flex justify-end gap-x-3">
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Adicionar Transação
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}