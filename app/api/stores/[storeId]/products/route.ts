import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      storeId: string
    }
  }
) {
  try {
    const { searchParams } = new URL(req.url)
    const categoryId = searchParams.get('categoryId') || undefined
    const sizeId = searchParams.get('sizeId') || undefined
    const colorId = searchParams.get('colorId') || undefined
    const isFeatured = searchParams.get('isFeatured') ? true : undefined

    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        sizeId,
        colorId,
        isFeatured,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true,
      },
    })
    return NextResponse.json(products)
  } catch (e) {
    console.error('[PRODUCTS_GET]', e)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth()
    const { storeId } = params

    const body = await req.json()
    const {
      name,
      price,
      categoryId,
      isFeatured,
      isArchived,
      images,
      sizeId,
      colorId,
    } = body

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }
    if (!storeId) {
      return new NextResponse('Store id is required', { status: 400 })
    }
    if (!name) {
      return new NextResponse('Name is required', { status: 400 })
    }
    if (!price) {
      return new NextResponse('Price is required', { status: 400 })
    }
    if (!categoryId) {
      return new NextResponse('Category id required', { status: 400 })
    }
    if (!sizeId) {
      return new NextResponse('Size id required', { status: 400 })
    }
    if (!sizeId) {
      return new NextResponse('Color id required', { status: 400 })
    }
    if (isFeatured === undefined) {
      return new NextResponse('isFeatured is required', { status: 400 })
    }
    if (isArchived === undefined) {
      return new NextResponse('isArchived is required', { status: 400 })
    }

    const product = await prismadb.product.create({
      data: {
        name,
        price,
        storeId,
        isFeatured,
        isArchived,
        categoryId,
        sizeId,
        colorId,
        images: {
          createMany: {
            data: images,
          },
        },
      },
    })

    return NextResponse.json(product)
  } catch (e) {
    console.error('[PRODUCTS]', e)
    return new NextResponse('Internal error', { status: 500 })
  }
}
