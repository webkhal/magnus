import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma.js';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const countryId = searchParams.get('countryId');

    if (!countryId) {
      return NextResponse.json({ error: 'Missing countryId' }, { status: 400 });
    }

    const states = await prisma.state.findMany({
      where: { countryId },
      orderBy: { name: 'asc' },
    });

    return NextResponse.json(states);
  } catch (error) {
    console.error('Error in /api/location/states:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}