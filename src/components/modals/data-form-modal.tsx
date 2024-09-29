import React from 'react'

import { Button } from '../../components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog'
import { Input } from '../ui/input'

export function DataFormModal() {
  const handleSubmit = () => {
    // Lógica de submissão do formulário
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Novo Dado</Button>{' '}
        {/* Substituído "primary" por "default" */}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo Dado</DialogTitle>
          <DialogDescription>
            Preencha as informações para criar um novo dado.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input placeholder="Digite o nome" required />
            {/* Outros campos de formulário */}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Cancelar</Button>
            </DialogClose>
            <Button type="submit" variant="default">
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
