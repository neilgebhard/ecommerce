'use client'

import { useParams, useRouter } from 'next/navigation'
import { CategoryColumn, columns } from './columns'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { DataTable } from '@/components/ui/data-table'
import ApiList from '@/components/api-list'
import { Separator } from '@/components/ui/separator'

const Client = ({ data }: { data: CategoryColumn[] }) => {
  const router = useRouter()
  const params = useParams()

  return (
    <>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Categories</h2>
          <p className='text-sm text-muted-foreground'>
            Manage the categories of the products of your store
          </p>
        </div>
        <Button
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
        >
          <Plus className='mr-2 h-4 w-4' /> Add New
        </Button>
      </div>
      <Separator className='my-8' />
      <DataTable columns={columns} data={data} />
      <div>
        <h2 className='text-2xl font-bold tracking-tight'>API</h2>
        <p className='text-sm text-muted-foreground'>
          API calls for categories
        </p>
      </div>
      <Separator className='my-8' />
      <ApiList entityName='categories' entityIdName='categoryId' />
    </>
  )
}

export default Client
