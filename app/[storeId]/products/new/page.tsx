import prismadb from '@/lib/prismadb'
import Client from './client'

type Props = {
  params: { storeId: string; productId: string }
}

const Page: React.FC<Props> = async ({ params }) => {
  const [categories, sizes, colors] = await Promise.all([
    prismadb.category.findMany({
      where: {
        storeId: params.storeId,
      },
    }),
    prismadb.size.findMany({
      where: {
        storeId: params.storeId,
      },
    }),
    prismadb.color.findMany({
      where: {
        storeId: params.storeId,
      },
    }),
  ])

  return <Client categories={categories} sizes={sizes} colors={colors} />
}

export default Page
