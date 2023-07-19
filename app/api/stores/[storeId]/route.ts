import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function PUT(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth()
    const { storeId } = params

    const body = await req.json()
    const { name } = body

    if (!userId) return new NextResponse('Unauthorized', { status: 401 })
    if (!storeId) return new NextResponse('Id is required', { status: 400 })
    if (!name) return new NextResponse('Name is required', { status: 400 })

    const store = await prismadb.store.update({
      where: {
        id: storeId,
      },
      data: {
        name,
      },
    })

    return NextResponse.json(store)
  } catch (e) {
    console.error('[STORES_PUT]', e)
    return new NextResponse('Internal error', { status: 500 })
  }
}
