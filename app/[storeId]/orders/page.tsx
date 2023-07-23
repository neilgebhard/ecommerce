import prismadb from '@/lib/prismadb'
import Client from './client'
import { format } from 'date-fns'

const Page = async ({ params }: { params: { storeId: string } }) => {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  })

  const formattedOrders = orders.map((order) => {
    return {
      id: order.id,
      phone: order.phone,
      address: order.address,
      total: order.orderItems.reduce((acc, item) => {
        return acc + Number(item.product.price)
      }, 0),
      products: order.orderItems.map((item) => item.product.name).join(', '),
      createdAt: format(order.createdAt, 'MM/dd/yyyy'),
      isPaid: order.isPaid,
    }
  })

  return (
    <div className='px-4 py-8 mx-auto max-w-4xl'>
      <Client data={formattedOrders} />
    </div>
  )
}

export default Page
