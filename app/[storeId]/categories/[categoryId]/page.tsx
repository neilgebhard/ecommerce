import prismadb from '@/lib/prismadb'
import Client from './client'

type Props = {
  params: { storeId: string; categoryId: string }
}

const Page: React.FC<Props> = async ({ params }) => {
  const category = await prismadb.category.findUnique({
    where: {
      id: params.categoryId,
    },
  })

  return (
    <div className='px-4 py-8 mx-auto max-w-4xl'>
      <Client data={category} />
    </div>
  )
}

export default Page
