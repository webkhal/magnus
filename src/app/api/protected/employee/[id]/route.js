import { prisma } from '../../../../../../lib/prisma.js';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function PUT(req, { params }) {
  const { id } = params;
  const data = await req.json();

  try {
    const updated = await prisma.employee.update({
      where: { id: new ObjectId(id) }, // 👈 FIX HERE
      data,
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error('PUT /employee/[id] failed:', error);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    await prisma.employee.delete({
      where: { id: new ObjectId(id) }, // 👈 FIX HERE
    });
    return NextResponse.json({ message: 'Employee deleted' });
  } catch (error) {
    console.error('DELETE /employee/[id] failed:', error);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
