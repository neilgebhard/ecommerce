'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Edit, MoreHorizontal, X } from 'lucide-react'

import { Button } from '@/components/ui/button'

export type CategoryColumn = {
  id: string
  name: string
  createdAt: string
}

export const columns: ColumnDef<CategoryColumn>[] = [
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
]
