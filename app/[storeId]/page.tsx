import prismadb from '@/lib/prismadb'
import Client from './client'

type Props = {
  params: { storeId: string }
}

const Page: React.FC<Props> = async ({ params }) => {
  const { storeId } = params

  const store = await prismadb.store.findUnique({
    where: {
      id: storeId,
    },
  })

  return (
    <div className='px-4 py-8 mx-auto max-w-4xl'>
      <Client />
    </div>
  )
}

export default Page
