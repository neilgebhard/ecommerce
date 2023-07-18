import { auth, redirectToSignIn } from '@clerk/nextjs'

import prismadb from '@/lib/prismadb'
import { redirect } from 'next/navigation'

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = auth()

  if (!userId) redirectToSignIn()

  const store = await prismadb.store.findFirst({
    where: {
      userId: userId!,
    },
  })

  if (store) redirect(`/${store?.id}`)

  return <>{children}</>
}
