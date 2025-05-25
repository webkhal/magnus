// /api/location/cities/route.js
import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma.js';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const stateId = searchParams.get('stateId');
  if (!stateId) return NextResponse.json([]);

  try {
    const cities = await prisma.city.findMany({
      where: { stateId }, // 👈 no parseInt
    });

    return NextResponse.json(cities);
  } catch (error) {
    console.error('Error fetching cities:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}