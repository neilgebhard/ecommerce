import Client from './client'
import getTotalStock from '@/actions/get-total-stock'
import getTotalSales from '@/actions/get-total-sales'
import getTotalRevenue from '@/actions/get-total-revenue'
import getMonthlyRevenue from '@/actions/get-monthly-revenue'

type Props = {
  params: { storeId: string }
}

const Page: React.FC<Props> = async ({ params }) => {
  const { storeId } = params

  const totalSales = await getTotalSales(storeId)
  const totalStock = await getTotalStock(storeId)
  const totalRevenue = await getTotalRevenue(storeId)
  const monthlyRevenue = await getMonthlyRevenue(storeId)

  return (
    <div className='px-4 py-8 mx-auto max-w-4xl'>
      <Client
        totalRevenue={totalRevenue}
        totalSales={totalSales}
        totalStock={totalStock}
        monthlyRevenue={monthlyRevenue}
      />
    </div>
  )
}

export default Page
