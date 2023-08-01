'use client'

import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { CircleDollarSign, Shirt, WalletCards } from 'lucide-react'

type Props = {
  totalRevenue: number
  totalSales: number
  totalStock: number
  monthlyRevenue: any[]
}

const Client: React.FC<Props> = ({
  totalRevenue,
  totalSales,
  totalStock,
  monthlyRevenue,
}) => {
  return (
    <div>
      <h2 className='text-2xl font-bold tracking-tight'>Dashboard</h2>
      <p className='text-sm text-muted-foreground'>Metrics of your store</p>
      <Separator className='my-8' />
      <div className='grid gap-4 sm:grid-cols-1 lg:grid-cols-3'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Revenue</CardTitle>
            <CircleDollarSign className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>${totalRevenue.toFixed(2)}</div>
            <p className='text-xs text-muted-foreground'>
              Total revenue from all sales
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Number of Sales
            </CardTitle>
            <WalletCards className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{totalSales}</div>
            <p className='text-xs text-muted-foreground'>
              Total number of individual sales
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Stock</CardTitle>
            <Shirt className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{totalStock}</div>
            <p className='text-xs text-muted-foreground'>
              Number of items in stock
            </p>
          </CardContent>
        </Card>
      </div>
      <Card className='col-span-4 mt-4'>
        <CardHeader>
          <CardTitle>Monthly Revenue</CardTitle>
        </CardHeader>
        <CardContent className='pl-2'>
          <ResponsiveContainer width='100%' height={350}>
            <BarChart data={monthlyRevenue}>
              <XAxis
                dataKey='name'
                stroke='#888888'
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke='#888888'
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Bar dataKey='total' fill='#3498db' radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export default Client
