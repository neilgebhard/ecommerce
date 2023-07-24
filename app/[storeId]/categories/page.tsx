import prismadb from '@/lib/prismadb'
import Client from './client'
import { format } from 'date-fns'

const Page = async ({ params }: { params: { storeId: string } }) => {
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
  })

  const data = categories.map((category) => {
    return {
      id: category.id,
      name: category.name,
      createdAt: format(category.createdAt, 'MM/dd/yyyy'),
    }
  })

  return (
    <div className='px-4 py-8 mx-auto max-w-4xl'>
      <Client data={data} />
    </div>
  )
}

export default Page
