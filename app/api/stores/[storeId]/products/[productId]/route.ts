import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function PUT(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth()
    const { storeId, productId } = params

    const body = await req.json()
    const { name, price, isFeatured, isArchived, images, categoryId, sizeId } =
      body

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }
    if (!storeId) {
      return new NextResponse('Store id is required', { status: 400 })
    }
    if (!productId) {
      return new NextResponse('Product id is required', { status: 400 })
    }
    if (!name) {
      return new NextResponse('Name is required', { status: 400 })
    }
    if (!price) {
      return new NextResponse('Price is required', { status: 400 })
    }
    if (!categoryId) {
      return new NextResponse('Category id is required', { status: 400 })
    }
    if (!sizeId) {
      return new NextResponse('Size id is required', { status: 400 })
    }
    if (isFeatured === undefined) {
      return new NextResponse('isFeatured is required', { status: 400 })
    }
    if (isArchived === undefined) {
      return new NextResponse('isArchived is required', { status: 400 })
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

    await prismadb.product.update({
      where: {
        id: productId,
      },
      data: {
        name,
        price,
        isFeatured,
        isArchived,
        categoryId,
        sizeId,
        images: {
          deleteMany: {},
        },
      },
    })

    const product = await prismadb.product.update({
      where: {
        id: productId,
      },
      data: {
        images: {
          createMany: {
            data: images,
          },
        },
      },
    })

    return NextResponse.json(product)
  } catch (e) {
    console.error('[PRODUCTS_PUT]', e)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth()
    const { storeId, productId } = params

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }
    if (!storeId) {
      return new NextResponse('Store id is required', { status: 400 })
    }
    if (!productId) {
      return new NextResponse('Product id is required', { status: 400 })
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

    await prismadb.product.update({
      where: {
        id: productId,
      },
      data: {
        images: {
          deleteMany: {},
        },
      },
    })

    const product = await prismadb.product.delete({
      where: {
        id: productId,
      },
    })

    return NextResponse.json(product)
  } catch (e) {
    console.error('[PRODUCTS_DELETE]', e)
    return new NextResponse('Internal error', { status: 500 })
  }
}
