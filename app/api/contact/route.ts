import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body;

    console.log('Request body:', body);

    if (!name && !email && !phone && !message) {
      return NextResponse.json({ error: 'At least one field (name, email, phone, message) is required' }, { status: 400 });
    }

    const data: Record<string, any> = {
      id: Math.floor(Math.random() * 1000000),
    };
    if (name) data.name = name;
    if (email) data.email = email;
    if (phone) data.phone = phone;
    if (message) data.message = message;

    console.log('Data to create:', data);

    const created = await prisma.contact_leads.create({ data });
    console.log('Created record:', created);

    return NextResponse.json({
      ...created,
      created_at: created.created_at.toISOString(),
    }, { status: 201 });
  } catch (error: any) {
    console.error('Contact API Error:', error);
    console.error('Error stack:', error.stack);
    return NextResponse.json({ error: error?.message || 'Failed to create contact lead' }, { status: 500 });
  }
}
