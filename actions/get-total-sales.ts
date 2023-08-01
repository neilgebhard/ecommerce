import prismadb from '@/lib/prismadb'

const getTotalSales = async (storeId: string) => {
  const totalSales = await prismadb.order.count({
    where: {
      storeId,
      isPaid: true,
    },
  })

  return totalSales
}

export default getTotalSales
