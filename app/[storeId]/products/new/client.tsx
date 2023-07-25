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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Plus } from 'lucide-react'
import ImageUpload from '@/components/image-upload'
import { Category } from '@prisma/client'

const formSchema = z.object({
  name: z.string().min(1),
  price: z.coerce.number().min(1),
  isFeatured: z.boolean(),
  isArchived: z.boolean(),
  images: z.object({ url: z.string() }).array(),
  categoryId: z.string().min(1),
})

type Props = {
  categories: Category[]
}

const Client: React.FC<Props> = ({ categories }) => {
  const params = useParams()
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      price: 0,
      isFeatured: false,
      isArchived: false,
      categoryId: '',
      images: [],
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values)
    try {
      setLoading(true)
      await axios.post(`/api/stores/${params.storeId}/products`, values)
      router.refresh()
      router.push(`/${params.storeId}/products`)
      toast.success('Product created')
    } catch (e) {
      console.error(e)
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='px-4 py-8 mx-auto max-w-4xl'>
      <h2 className='text-2xl font-bold tracking-tight'>Create Product</h2>
      <p className='text-sm text-muted-foreground'>
        Add a new product to your store
      </p>
      <Separator className='my-8' />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 max-w-sm'
        >
          <FormField
            control={form.control}
            name='images'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    urls={field.value.map((image) => image.url)}
                    disabled={loading}
                    onChange={(url) =>
                      field.onChange([...field.value, { url }])
                    }
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((current) => current.url !== url),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder='Product name'
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  The name of your product which is publically visible.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    disabled={loading}
                    placeholder='9.99'
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  The price your product is sold for.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='categoryId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select disabled={loading} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className='w-[180px]'>
                      <SelectValue placeholder='Select a category' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormDescription>
                  The category which your product belongs to.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='isFeatured'
            render={({ field }) => (
              <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                <FormControl>
                  <Checkbox
                    disabled={loading}
                    checked={field.value}
                    // @ts-ignore
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className='space-y-1 leading-none'>
                  <FormLabel>Featured product</FormLabel>
                  <FormDescription>
                    Featured products are visible on the home page.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='isArchived'
            render={({ field }) => (
              <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                <FormControl>
                  <Checkbox
                    disabled={loading}
                    checked={field.value}
                    // @ts-ignore
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className='space-y-1 leading-none'>
                  <FormLabel>Archived</FormLabel>
                  <FormDescription>
                    Archived products are not displayed to customers on the
                    market for sale (e.g. out of stock).
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <Button type='submit' disabled={loading}>
            <Plus className='mr-2 h-4 w-4' /> Create product
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default Client
