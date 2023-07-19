import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import prismadb from '@/lib/prismadb'
import Navbar from '@/components/Navbar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = auth()

  if (!userId) redirect('/sign-in')

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  })

  if (!stores) redirect('/')

  return (
    <>
      <Navbar stores={stores} />
      {children}
    </>
  )
}
