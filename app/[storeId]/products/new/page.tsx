import prismadb from '@/lib/prismadb'
import Client from './client'

type Props = {
  params: { storeId: string; productId: string }
}

const Page: React.FC<Props> = async ({ params }) => {
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
  })
  return <Client categories={categories} />
}

export default Page
