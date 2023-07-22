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
    const { name, price, isFeatured, isArchived, images } = body

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
        isFeatured,
        isArchived,
        storeId: params.storeId,
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
