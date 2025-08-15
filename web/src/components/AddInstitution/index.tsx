'use client'

import { useState } from 'react'
import useSWR from 'swr'

import Modal from '@/shared/Modal'
import Input from '@/shared/Input'
import Select from '@/shared/Select'
import Button from '@/shared/Button'

import { api, useForm, zodResolver, toast } from '@/utils/useImportOnForm'
import { fetcher } from '@/utils/fetcher'

import { InstitutionSchema, institutionSchema } from '@/schemas/institutionSchema'
import { InstitutionTypes } from '@/types/Institution'

const url = {
  institutions: 'institutions',
  types: 'institution-types'
}

export default function AddInstitution() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { data: types, mutate } = useSWR<InstitutionTypes[]>(url.types, fetcher)

  const { register, handleSubmit, formState: { errors, isSubmitting  }, reset } = useForm<InstitutionSchema>({
    resolver: zodResolver(institutionSchema)
  })

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const onSubmit = async (data: InstitutionSchema) => {
    try {
      await api.post(url.institutions, data)
      reset()
      handleCloseModal()
      toast.success('Instituição adicionada com sucesso!')
    } catch (error) {
      console.log(error)
      toast.error('Erro ao adicionar instituição')
    }
  }

  return (
    <>
      <Button variant="primary" onClick={handleOpenModal}>
        Adicionar Instituição
      </Button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Adicionar Nova Instituição">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            type="text"
            name="name"
            label="Nome da Instituição"
            placeholder="Ex: Banco do Brasil"
            register={register}
            error={errors.name?.message}
          />
          <Select
            name="typeId"
            label="Tipo de Instituição"
            addItem
            itemData={{
              title: 'Adicionar Novo Tipo',
              api_url: url.types,
              onAdd: async () => { await mutate() }
            }}
            options={types || []}
            register={register}
            error={errors.typeId?.message}
          />
          <Input
            type="number"
            name="ispb"
            label="ISPB"
            placeholder="Ex: 00000000"
            register={register}
            error={errors.ispb?.message}
          />
          <Input
            type="number"
            name="code"
            label="Código"
            placeholder="Ex: 001"
            register={register}
            error={errors.code?.message}
          />
          <Input
            type="text"
            name="website"
            label="Website (Opcional)"
            placeholder="Ex: www.bancodobrasil.com.br"
            register={register}
            error={errors.website?.message}
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