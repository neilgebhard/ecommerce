import prismadb from '@/lib/prismadb'
import ProductsClient from './client'

const Products = async ({ params }: { params: { storeId: string } }) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
  })

  return (
    <div className='px-4 py-8 mx-auto max-w-4xl'>
      <ProductsClient products={JSON.parse(JSON.stringify(products))} />
    </div>
  )
}

export default Products
