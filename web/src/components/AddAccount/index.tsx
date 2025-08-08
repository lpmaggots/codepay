'use client'

import { useState } from 'react'
import Modal from '@/shared/Modal'
import Input from '@/shared/Input'
import Select from '@/shared/Select'
import Button from '@/shared/Button'

export default function AddAccount() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Conta adicionada!')
    handleCloseModal()
  }

  return (
    <>
      <Button variant="primary" onClick={handleOpenModal}>
        Adicionar Conta
      </Button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Adicionar Nova Conta">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            name="name"
            label="Nome da Conta"
            placeholder="Ex: Conta Corrente Principal"
          />
          <Select
            name="bank"
            label="Banco"
            options={[
              { value: 'banco_do_brasil', label: 'Banco do Brasil' },
              { value: 'nubank', label: 'NuBank' },
              { value: 'itau', label: 'Itaú' },
              { value: 'bradesco', label: 'Bradesco' },
              { value: 'santander', label: 'Santander' },
              { value: 'caixa', label: 'Caixa Econômica Federal' },
              { value: 'inter', label: 'Banco Inter' },
              { value: 'c6_bank', label: 'C6 Bank' },
              { value: 'will_bank', label: 'Will Bank' },
              { value: 'banrisul', label: 'Banrisul' },
              { value: 'sicoob', label: 'Sicoob' },
              { value: 'sicredi', label: 'Sicredi' },
              { value: 'original', label: 'Banco Original' },
              { value: 'bs2', label: 'Banco BS2' },
              { value: 'modalmais', label: 'Modalmais' },
              { value: 'xp_investimentos', label: 'XP Investimentos' },
              { value: 'clear_corretora', label: 'Clear Corretora' },
              { value: 'rico', label: 'Rico' },
              { value: 'outros', label: 'Outros' },
            ]}
          />
          <Select
            name="type"
            label="Tipo de Conta"
            options={[
              { value: 'checking_account', label: 'Conta Corrente' },
              { value: 'savings_account', label: 'Conta Poupança' },
              { value: 'credit_card', label: 'Cartão de Crédito' },
              { value: 'investment', label: 'Investimento' },
              { value: 'cash', label: 'Dinheiro Físico' },
              { value: 'other', label: 'Outro' },
            ]}
          />
          <Input
            type="number"
            name="initialBalance"
            label="Saldo Inicial"
            placeholder="0.00"
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
