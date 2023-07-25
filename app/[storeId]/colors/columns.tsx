'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Edit, MoreHorizontal, X } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import ConfirmDeleteModal from '@/components/confirm-delete-modal'

export type ColorColumn = {
  id: string
  name: string
  value: string
  createdAt: string
}

export const columns: ColumnDef<ColorColumn>[] = [
  {
    accessorKey: 'createdAt',
    header: 'Date',
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
  },
  {
    accessorKey: 'value',
    header: 'Value',
    cell: ({ row }) => {
      return (
        <div className='flex items-center gap-2'>
          {row.original.value}
          <div
            className='h-6 w-6 border rounded-full'
            style={{ backgroundColor: row.original.value }}
          />
        </div>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <Dropdown data={row.original} />,
  },
]

const Dropdown = ({ data }: { data: ColorColumn }) => {
  const [loading, setLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const router = useRouter()
  const params = useParams()

  const handleDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/stores/${params.storeId}/colors/${data.id}`)
      toast.success('Color deleted.')
      router.refresh()
    } catch (e) {
      console.error(e)
      toast.error('Something went wrong.')
    } finally {
      setLoading(false)
      setOpenModal(false)
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => router.push(`/${params.storeId}/colors/${data.id}`)}
          >
            <Edit className='mr-2 h-4 w-4' /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenModal(true)}>
            <X className='mr-2 h-4 w-4' /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmDeleteModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        loading={loading}
        onConfirm={handleDelete}
      />
    </>
  )
}
