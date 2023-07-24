'use client'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import { ProductColumn, columns } from './columns'
import { DataTable } from './data-table'

const ProductsClient = ({ data }: { data: ProductColumn[] }) => {
  const router = useRouter()
  const params = useParams()

  return (
    <>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Products</h2>
          <p className='text-sm text-muted-foreground'>
            Manage the products of your store
          </p>
        </div>
        <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
          <Plus className='mr-2 h-4 w-4' /> Add New
        </Button>
      </div>
      <Separator className='my-8' />
      <DataTable columns={columns} data={data} />
    </>
  )
}

export default ProductsClient
