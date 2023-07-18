import { auth, redirectToSignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import prismadb from '@/lib/prismadb'
import Navbar from '@/components/Navbar'

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { storeId: string }
}) {
  const { userId } = auth()

  if (!userId) redirectToSignIn()

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId: userId!,
    },
  })

  console.log('[storeId] store:', store)

  if (!store) redirect('/')

  return (
    <div>
      <Navbar />
      <pre>{JSON.stringify(store, null, 2)}</pre>
      {children}
    </div>
  )
}
