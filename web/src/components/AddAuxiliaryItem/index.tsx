'use client'

import { useState } from 'react'
import { FaPlus } from 'react-icons/fa'

import Modal from '@/shared/Modal'
import Input from '@/shared/Input'
import Button from '@/shared/Button'

import { api, useForm, zodResolver, toast } from '@/hooks/useImportOnForm'
import { AddAuxiliaryItemSchema, addAuxiliaryItemSchema } from '@/schemas/addAuxiliaryItemSchema'

interface AddAuxiliaryItemProps {
  itemData?: {
    title: string
    api_url: string,
    onAdd?: () => void | Promise<void>
  }
}

export default function AddAuxiliaryItem({ itemData }: AddAuxiliaryItemProps) {
  const title = itemData?.title || ''
  const api_url = itemData?.api_url || ''
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting  }, reset } = useForm<AddAuxiliaryItemSchema>({
    resolver: zodResolver(addAuxiliaryItemSchema)
  })

  const handleModalOpen = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const onSubmit = async (data: AddAuxiliaryItemSchema) => {
    try {
      await api.post(api_url, data)
      reset()
      handleModalClose()
      toast.success('Item adicionado com sucesso!')
      
      if(itemData?.onAdd) {
        itemData.onAdd()
      }
    } catch (error: any) {
      console.log(error.response?.data?.message || 'Erro ao cadastrar')
    }
  }

  return (
    <>
      <Button
        onClick={handleModalOpen}
        variant="link"
        className="flex items-center gap-1"
      >
        <FaPlus className="inline" />
        Adicionar novo
      </Button>

      <Modal
        title={title}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      >
        <div className="space-y-4">
          <Input
            type="text"
            name="description"
            label="Descrição"
            register={register}
            error={errors.description?.message}
            placeholder="Insira a descrição do novo item"
          />
          <div className="flex justify-end gap-x-3">
            <Button
              type="button"
              onClick={handleSubmit(onSubmit)}
              variant="primary"
            >
              Adicionar
            </Button>
            <Button
              variant="secondary"
              onClick={handleModalClose}
            >
              Cancelar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}