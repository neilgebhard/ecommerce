import prismadb from '@/lib/prismadb'
import Client from './client'

type Props = {
  params: { storeId: string; sizeId: string }
}

const Page: React.FC<Props> = async ({ params }) => {
  const size = await prismadb.size.findUnique({
    where: {
      id: params.sizeId,
    },
  })

  return (
    <div className='px-4 py-8 mx-auto max-w-4xl'>
      <Client data={size} />
    </div>
  )
}

export default Page
