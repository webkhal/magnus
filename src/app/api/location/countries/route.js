
// /api/location/countries/route.js
import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma.js';

export async function GET() {
  const countries = await prisma.country.findMany();
  return NextResponse.json(countries);
}
