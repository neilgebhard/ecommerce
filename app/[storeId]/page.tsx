import prismadb from '@/lib/prismadb'

type Props = {
  params: { storeId: string }
}

const Page: React.FC<Props> = async ({ params }) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  })

  return (
    <div>
      <h1>This will be the dashboard.</h1>
      <h2>name: {store?.name}</h2>
    </div>
  )
}

export default Page
