'use client'

import { Button } from '@/components/ui/button'
import { useModal } from '@/app/context/StoreModalProvider'
import { UserButton } from '@clerk/nextjs'

export default function Home() {
  const { openModal } = useModal()

  return (
    <main className='p-4'>
      <UserButton afterSignOutUrl='/' />
      <Button onClick={openModal}>Open Modal</Button>
    </main>
  )
}
