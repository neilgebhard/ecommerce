import prismadb from '@/lib/prismadb'
import ProductsClient from './ProductsClient'

const Products = async ({ params }: { params: { storeId: string } }) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
  })

  return (
    <div className='p-4 mx-auto max-w-4xl'>
      <ProductsClient products={JSON.parse(JSON.stringify(products))} />
    </div>
  )
}

export default Products
