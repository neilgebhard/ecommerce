import prismadb from '@/lib/prismadb'
import Client from './client'

type Props = {
  params: { storeId: string; colorId: string }
}

const Page: React.FC<Props> = async ({ params }) => {
  const color = await prismadb.color.findUnique({
    where: {
      id: params.colorId,
    },
  })

  return (
    <div className='px-4 py-8 mx-auto max-w-4xl'>
      <Client data={color} />
    </div>
  )
}

export default Page
