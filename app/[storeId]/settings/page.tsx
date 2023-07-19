import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import prismadb from '@/lib/prismadb'
import SettingsForm from '@/components/SettingsForm'

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
    <div className='p-4'>
      <SettingsForm store={store} />
    </div>
  )
}

export default Settings
