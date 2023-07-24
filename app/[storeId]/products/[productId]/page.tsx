import prismadb from '@/lib/prismadb'
import Client from './client'

type Props = {
  params: { storeId: string; productId: string }
}

const Page: React.FC<Props> = async ({ params }) => {
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  })

  return (
    <div className='px-4 py-8 mx-auto max-w-4xl'>
      <Client data={product} />
    </div>
  )
}

export default Page
