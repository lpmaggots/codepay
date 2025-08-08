'use client'

import { useState } from 'react'
import Modal from '@/shared/Modal'
import Input from '@/shared/Input'
import Select from '@/shared/Select'
import Button from '@/shared/Button'

export default function AddInstitution() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Instituição adicionada!')
    handleCloseModal()
  }

  return (
    <>
      <Button variant="primary" onClick={handleOpenModal}>
        Adicionar Instituição
      </Button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Adicionar Nova Instituição">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            name="name"
            label="Nome da Instituição"
            placeholder="Ex: Banco do Brasil"
          />
          <Select
            name="type"
            label="Tipo de Instituição"
            options={[
              { value: 'bank', label: 'Banco' },
              { value: 'credit_union', label: 'Cooperativa de Crédito' },
              { value: 'brokerage', label: 'Corretora de Investimentos' },
              { value: 'other', label: 'Outro' },
            ]}
          />
          <Input
            type="text"
            name="website"
            label="Website (Opcional)"
            placeholder="Ex: www.bancodobrasil.com.br"
          />
          <div className="flex justify-end gap-x-3">
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Adicionar Conta
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}