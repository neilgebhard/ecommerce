import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function PUT(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth()
    const { storeId, categoryId } = params
    const body = await req.json()
    const { name } = body

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }
    if (!name) {
      return new NextResponse('Name is required', { status: 400 })
    }
    if (!categoryId) {
      return new NextResponse('Category id is required', { status: 400 })
    }

    const storeByUserId = await prismadb.store.findUnique({
      where: { userId, id: storeId },
    })

    if (!storeByUserId) {
      if (!userId) return new NextResponse('Unauthorized', { status: 403 })
    }

    const category = await prismadb.category.update({
      where: { id: categoryId },
      data: {
        name,
        storeId: storeId,
      },
    })

    return NextResponse.json(category)
  } catch (e) {
    console.error('[CATEGORIES_PUT]', e)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth()
    const { storeId, categoryId } = params

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }
    if (!storeId) {
      return new NextResponse('Store id is required', { status: 400 })
    }
    if (!categoryId) {
      return new NextResponse('Category id is required', { status: 400 })
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    })

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const category = await prismadb.category.delete({
      where: {
        id: categoryId,
      },
    })

    return NextResponse.json(category)
  } catch (e) {
    console.error('[CATEGORIES_DELETE]', e)
    return new NextResponse('Internal error', { status: 500 })
  }
}
