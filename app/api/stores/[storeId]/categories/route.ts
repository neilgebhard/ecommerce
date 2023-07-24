import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth()
    const { storeId } = params
    const body = await req.json()
    const { name } = body

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })
    if (!name) return new NextResponse('Name is required', { status: 400 })

    const storeByUserId = await prismadb.store.findUnique({
      where: { userId, id: storeId },
    })

    if (!storeByUserId) {
      if (!userId) return new NextResponse('Unauthorized', { status: 403 })
    }

    const category = await prismadb.category.create({
      data: {
        name,
        storeId: storeId,
      },
    })

    return NextResponse.json(category)
  } catch (e) {
    console.error('[CATEGORIES_POST]', e)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { storeId } = params

    if (!params) {
      return new NextResponse('Store id is required', { status: 400 })
    }

    const categories = await prismadb.category.findMany({
      where: { storeId },
    })

    return NextResponse.json(categories)
  } catch (e) {
    console.error('[CATEGORIES_GET]', e)
    return new NextResponse('Internal error', { status: 500 })
  }
}
