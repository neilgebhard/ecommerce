'use client'

import { useParams, useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
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
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Plus } from 'lucide-react'

const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
})

const Page = () => {
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      value: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)
      await axios.post(`/api/stores/${params.storeId}/colors`, values)
      router.refresh()
      router.push(`/${params.storeId}/colors`)
      toast.success('Color created')
    } catch (e) {
      console.error(e)
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='px-4 py-8 mx-auto max-w-4xl'>
      <h2 className='text-2xl font-bold tracking-tight'>Create Color</h2>
      <p className='text-sm text-muted-foreground'>
        Add a new color for a product of your store
      </p>
      <Separator className='my-8' />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 max-w-sm'
        >
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder='Color name'
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  What is the color of your product? (e.g. red, green, blue,
                  etc.)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='value'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Value</FormLabel>
                <FormControl>
                  <div className='flex items-center gap-2'>
                    <Input
                      disabled={loading}
                      placeholder='Color value'
                      {...field}
                    />
                    <div
                      className='w-8 h-8 rounded-full border'
                      style={{ backgroundColor: field.value }}
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  Use a hexadecimal value (e.g. #FFF for white, #0000FF for
                  blue, etc)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' disabled={loading}>
            <Plus className='mr-2 h-4 w-4' /> Create color
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default Page
