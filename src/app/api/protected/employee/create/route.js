import { NextResponse } from 'next/server';
import { prisma } from '../../../../../../lib/prisma.js';

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function parseDateString(dateStr) {
  // Assuming dob is "ddmmyyyy"
  if (!/^\d{8}$/.test(dateStr)) return null;
  const day = parseInt(dateStr.slice(0, 2));
  const month = parseInt(dateStr.slice(2, 4)) - 1;
  const year = parseInt(dateStr.slice(4, 8));
  const date = new Date(year, month, day);
  return isNaN(date) ? null : date;
}

export async function POST(req) {
  try {
    const body = await req.json();
    console.log('Received body:', body);

    // Validate required fields
    if (
      !body.firstName ||
      !body.lastName ||
      !body.email ||
      !isValidEmail(body.email) ||
      !body.mobile ||
      !body.dob ||
      !body.gender
    ) {
      return NextResponse.json(
        { success: false, message: 'Missing or invalid required fields.' },
        { status: 400 }
      );
    }

    // Parse DOB to Date object
    const dobDate = parseDateString(body.dob);
    if (!dobDate) {
      return NextResponse.json(
        { success: false, message: 'Invalid date of birth format.' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existing = await prisma.employee.findFirst({
      where: { email: body.email },
    });

    if (existing) {
      console.log('Email already exists:', body.email);
      return NextResponse.json(
        { success: false, message: 'Email already exists' },
        { status: 409 }
      );
    }

    // Create employee with parsed DOB
    const employee = await prisma.employee.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        mobile: body.mobile,
        dob: dobDate,
        gender: body.gender,
        address: body.address || '',
        country: body.country || '',
        city: body.city || '',
        otherCity: body.otherCity || false,
      },
    });

    return NextResponse.json({ success: true, data: employee });

  } catch (err) {
    console.error('API Error:', err);
    return NextResponse.json(
      { success: false, message: 'Something went wrong.' },
      { status: 500 }
    );
  }
}
