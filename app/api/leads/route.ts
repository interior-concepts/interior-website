import { supabaseServer } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'


// GET - Fetch all leads
export async function GET() {
  const { data, error } = await supabaseServer
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

// POST - Create a new lead
export async function POST(req: Request) {
  const body = await req.json()

  const { name, email, phone, status } = body

  if (!name || !email) {
    return NextResponse.json(
      { error: 'name and email required' },
      { status: 400 }
    )
  }

  const { data, error } = await supabaseServer
    .from('leads')
    .insert([
      {
        name,
        email,
        phone,
        status: status ?? 'new',
      },
    ])
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data[0], { status: 201 })
}
