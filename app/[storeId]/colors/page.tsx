import prismadb from '@/lib/prismadb'
import Client from './client'
import { format } from 'date-fns'

const Page = async ({ params }: { params: { storeId: string } }) => {
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
  })

  const data = colors.map((color) => {
    return {
      id: color.id,
      name: color.name,
      value: color.value,
      createdAt: format(color.createdAt, 'MM/dd/yyyy'),
    }
  })

  return (
    <div className='px-4 py-8 mx-auto max-w-4xl'>
      <Client data={data} />
    </div>
  )
}

export default Page
