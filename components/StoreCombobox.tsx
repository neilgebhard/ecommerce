'use client'

import * as React from 'react'
import { Check, ChevronsUpDown, PlusCircle, StoreIcon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import { Store } from '@prisma/client'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useModal } from '@/app/context/StoreModalProvider'

export default function StoreCombobox({ stores }: { stores: Store[] }) {
  const [open, setOpen] = React.useState(false)

  const { openModal } = useModal()

  const params = useParams()
  const router = useRouter()

  const currentStore = stores.find((store) => store.id === params.storeId)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          aria-label='Select a store'
          className='w-[200px] justify-between'
        >
          <StoreIcon className='mr-2 h-4 w-4' />
          {currentStore?.name}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandInput placeholder='Search store...' />
          <CommandEmpty>No store found.</CommandEmpty>
          <CommandList>
            <CommandGroup heading='Stores'>
              {stores.map((store) => (
                <CommandItem
                  key={store.id}
                  onSelect={() => {
                    router.push(`/${store.id}`)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      currentStore?.id === store.id
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                  {store.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandGroup>
            <CommandItem
              onSelect={() => {
                setOpen(false)
                openModal()
              }}
            >
              <PlusCircle className='mr-2 h-5 w-5' />
              Create store
            </CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
