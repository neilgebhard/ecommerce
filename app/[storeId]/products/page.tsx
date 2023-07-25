import prismadb from '@/lib/prismadb'
import Client from './client'
import { formatToUSD } from '@/lib/utils'

const Products = async ({ params }: { params: { storeId: string } }) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      size: true,
    },
  })

  const data = products.map((product) => {
    return {
      id: product.id,
      name: product.name,
      price: formatToUSD.format(Number(product.price)),
      isFeatured: product.isFeatured ? 'Yes' : 'No',
      isArchived: product.isArchived ? 'Yes' : 'No',
      category: product.category.name,
      size: product.size.name,
    }
  })

  return (
    <div className='px-4 py-8 mx-auto max-w-4xl'>
      <Client data={data} />
    </div>
  )
}

export default Products
