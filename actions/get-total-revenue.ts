// order. isPaid true, include orderItems products. Add all product prices
import prismadb from '@/lib/prismadb'

const getTotalRevenue = async (storeId: string) => {
  const paidOrders = await prismadb.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  })

  const totalRevenue = paidOrders.reduce((acc, order) => {
    const orderTotal = order.orderItems.reduce((acc, orderItem) => {
      return acc + Number(orderItem.product.price)
    }, 0)
    return acc + orderTotal
  }, 0)

  return totalRevenue
}

export default getTotalRevenue
