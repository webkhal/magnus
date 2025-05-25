import { prisma } from '../../.../../../../lib/prisma.js'; // fix path as needed
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { fileName, base64 } = await req.json();

    if (!fileName || !base64) {
      return NextResponse.json({ error: 'Missing fileName or base64' }, { status: 400 });
    }

    // Save image base64 string and fileName to DB
    const savedImage = await prisma.image.create({
      data: {
        fileName,
        base64,  // your Image model must have this field as String
      },
    });

    return NextResponse.json({ message: 'Upload successful', image: savedImage });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed', details: error.message }, { status: 500 });
  }
}
