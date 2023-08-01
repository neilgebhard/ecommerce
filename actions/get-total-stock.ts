// product. get all items currently for sale
import prismadb from '@/lib/prismadb'

const getTotalStock = async (storeId: string) => {
  const totalStock = await prismadb.product.count({
    where: {
      storeId,
      isArchived: false,
    },
  })

  return totalStock
}

export default getTotalStock
