'use client'

import { useParams, useRouter } from 'next/navigation'
import { SizeColumn, columns } from './columns'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { DataTable } from '@/components/ui/data-table'
import ApiList from '@/components/api-list'
import { Separator } from '@/components/ui/separator'

const Client = ({ data }: { data: SizeColumn[] }) => {
  const router = useRouter()
  const params = useParams()

  return (
    <>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Sizes</h2>
          <p className='text-sm text-muted-foreground'>
            Manage the sizes of the products of your store
          </p>
        </div>
        <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
          <Plus className='mr-2 h-4 w-4' /> Add New
        </Button>
      </div>
      <Separator className='my-8' />
      <DataTable columns={columns} data={data} />
      <div>
        <h2 className='text-2xl font-bold tracking-tight'>API</h2>
        <p className='text-sm text-muted-foreground'>API calls for sizes</p>
      </div>
      <Separator className='my-8' />
      <ApiList entityName='sizes' entityIdName='sizeId' />
    </>
  )
}

export default Client
