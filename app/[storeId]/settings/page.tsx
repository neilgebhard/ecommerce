import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import prismadb from '@/lib/prismadb'
import Client from './client'

type Props = {
  params: {
    storeId: string
  }
}

const Settings: React.FC<Props> = async ({ params }) => {
  const { userId } = auth()

  if (!userId) redirect('/sign-in')

  const store = await prismadb.store.findUnique({
    where: {
      id: params.storeId,
      userId,
    },
  })

  if (!store) redirect('/')

  return (
    <div className='px-4 py-8 mx-auto max-w-4xl'>
      <h2 className='text-2xl font-bold tracking-tight'>Settings</h2>
      <p className='text-sm text-muted-foreground'>Manage store preferences</p>
      <Client store={store} />
    </div>
  )
}

export default Settings
