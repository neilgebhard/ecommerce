import prismadb from '@/lib/prismadb'
import Client from './client'
import { format } from 'date-fns'

const Page = async ({ params }: { params: { storeId: string } }) => {
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
  })

  const data = sizes.map((size) => {
    return {
      id: size.id,
      name: size.name,
      value: size.value,
      createdAt: format(size.createdAt, 'MM/dd/yyyy'),
    }
  })

  return (
    <div className='px-4 py-8 mx-auto max-w-4xl'>
      <Client data={data} />
    </div>
  )
}

export default Page
