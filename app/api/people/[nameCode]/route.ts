import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(req: NextRequest, { params }: { params: { nameCode: string} }) {
  const { nameCode } = params
  try {
    const person = await prisma.people.findUnique({
      where: { nameCode: nameCode, isActive: true, isPublished: true },
      include: {
        // introduction: false,
        updatedAt: false,
        createdAt: false,
      },
    })


    if (!person) {
      return NextResponse.json({ error: 'Person not found' }, { status: 404 })
    }

    return NextResponse.json(person)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch person' }, { status: 500 })
  }
}