import { NextResponse } from 'next/server';
// app/api/protected/employee/create/route.js
import { prisma } from '../../../../../../lib/prisma.js';


export async function POST(req) {
  try {
    const body = await req.json();

    const employee = await prisma.employee.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        mobile: body.mobile,
        dob: body.dob,
        gender: body.gender,
        address: body.address,
        country: body.country,
        city: body.city,
        otherCity: body.otherCity,
      },
    });

    return NextResponse.json({ success: true, data: employee });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 400 }
    );
  }
}
