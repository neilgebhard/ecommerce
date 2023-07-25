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
})

const Page = () => {
  const params = useParams()
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)
      await axios.post(`/api/stores/${params.storeId}/categories`, values)
      router.refresh()
      router.push(`/${params.storeId}/categories`)
      toast.success('Category created')
    } catch (e) {
      console.error(e)
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='px-4 py-8 mx-auto max-w-4xl'>
      <h2 className='text-2xl font-bold tracking-tight'>Create Category</h2>
      <p className='text-sm text-muted-foreground'>
        Add a new category to your store
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
                    placeholder='Category name'
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Each product will belong to a category (e.g. T-Shirts, Hats,
                  Accessories, etc.)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' disabled={loading}>
            <Plus className='mr-2 h-4 w-4' /> Create category
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default Page
