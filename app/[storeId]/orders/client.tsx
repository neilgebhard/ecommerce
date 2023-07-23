'use client'

import { Separator } from '@/components/ui/separator'

import { columns, OrderColumn } from './columns'
import { DataTable } from './data-table'

type Props = {
  data: OrderColumn[]
}

const Client: React.FC<Props> = ({ data }) => {
  return (
    <>
      <h2 className='text-2xl font-bold tracking-tight'>Orders</h2>
      <p className='text-sm text-muted-foreground'>
        Manage the orders of your store
      </p>
      <Separator className='my-8' />
      <DataTable columns={columns} data={data} />
    </>
  )
}

export default Client
