//
import prismadb from '@/lib/prismadb'

const getMonthlyRevenue = async (storeId: string) => {
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

  const monthlyRevenue: { [key: number]: number } = {}

  for (const order of paidOrders) {
    const nMonth = order.updatedAt.getMonth()
    let revenue = 0

    for (const item of order.orderItems) {
      revenue += Number(item.product.price)
    }

    monthlyRevenue[nMonth] = (monthlyRevenue[nMonth] || 0) + revenue
  }

  const graphData = [
    { name: 'Jan', total: 0 },
    { name: 'Feb', total: 0 },
    { name: 'Mar', total: 0 },
    { name: 'Apr', total: 0 },
    { name: 'May', total: 0 },
    { name: 'Jun', total: 0 },
    { name: 'Jul', total: 0 },
    { name: 'Aug', total: 0 },
    { name: 'Sep', total: 0 },
    { name: 'Oct', total: 0 },
    { name: 'Nov', total: 0 },
  ]

  for (const month in monthlyRevenue) {
    graphData[Number(month)].total = monthlyRevenue[Number(month)]
  }

  return graphData
}

export default getMonthlyRevenue
