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
import { Edit } from 'lucide-react'
import { Category } from '@prisma/client'

const formSchema = z.object({
  name: z.string().min(1),
})

interface Props {
  data: Category | null
}

const Client = ({ data }: Props) => {
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name,
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)
      await axios.put(
        `/api/stores/${params.storeId}/categories/${data?.id}`,
        values
      )
      router.refresh()
      router.push(`/${params.storeId}/categories`)
      toast.success('Category updated')
    } catch (e) {
      console.error(e)
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='px-4 py-8 mx-auto max-w-4xl'>
      <h2 className='text-2xl font-bold tracking-tight'>Edit Category</h2>
      <p className='text-sm text-muted-foreground'>
        Edit this category of your store
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
            <Edit className='mr-2 h-4 w-4' /> Edit category
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default Client
