'use client'

import { Button } from '@/components/ui/button'
import { useModal } from '@/app/context/StoreModalProvider'

export default function Home() {
  const { openModal } = useModal()

  return (
    <main className='h-screen grid place-items-center'>
      <div className='p-4 m-4 text-center border rounded-lg'>
        <Button onClick={openModal}>Create a store</Button>
        <p className='text-sm text-muted-foreground mt-3'>
          You currently have no stores.
        </p>
      </div>
    </main>
  )
}
