import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function PUT(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const { userId } = auth()
    const { storeId, colorId } = params
    const body = await req.json()
    const { name, value } = body

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }
    if (!name) {
      return new NextResponse('Name is required', { status: 400 })
    }
    if (!value) {
      return new NextResponse('Value is required', { status: 400 })
    }
    if (!colorId) {
      return new NextResponse('Color id is required', { status: 400 })
    }

    const storeByUserId = await prismadb.store.findUnique({
      where: { userId, id: storeId },
    })

    if (!storeByUserId) {
      if (!userId) return new NextResponse('Unauthorized', { status: 403 })
    }

    const color = await prismadb.color.update({
      where: { id: colorId },
      data: {
        name,
        value,
        storeId: storeId,
      },
    })

    return NextResponse.json(color)
  } catch (e) {
    console.error('[COLORS_PUT]', e)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const { userId } = auth()
    const { storeId, colorId } = params

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }
    if (!storeId) {
      return new NextResponse('Store id is required', { status: 400 })
    }
    if (!colorId) {
      return new NextResponse('Color id is required', { status: 400 })
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

    const color = await prismadb.color.delete({
      where: {
        id: colorId,
      },
    })

    return NextResponse.json(color)
  } catch (e) {
    console.error('[COLORS_DELETE]', e)
    return new NextResponse('Internal error', { status: 500 })
  }
}
