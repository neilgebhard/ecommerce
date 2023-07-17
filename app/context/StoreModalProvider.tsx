'use client'

import { createContext, useContext, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'

const formSchema = z.object({
  name: z.string().min(1).max(50),
})

type Props = {
  openModal: () => void
}

const Context = createContext<Props>({} as Props)

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // TODO: create store
    console.log(data)
  }

  const openModal = () => setIsOpen(true)

  const onChange = (open: boolean) => setIsOpen(open)

  return (
    <Context.Provider value={{ openModal }}>
      {children}
      <Dialog open={isOpen} onOpenChange={onChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a store</DialogTitle>
            <DialogDescription>
              Each store represents an individual product. (.e.g clothes, food,
              etc.)
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <div>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-6'
              >
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        This is the name of your store.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type='submit'>Submit</Button>
                </DialogFooter>
              </form>
            </div>
          </Form>
        </DialogContent>
      </Dialog>
    </Context.Provider>
  )
}

export const useModal = () => useContext(Context)
