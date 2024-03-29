import { kv } from '@vercel/kv'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export async function GET(
  request: NextRequest,
  { params }: { params: { email: string } }
) {
  try {
    const { email } = params

    const leagues = await kv.smembers(`user:${email}:following:leagues`)
    const teams = await kv.smembers(`user:${email}:following:teams`)
    const players = await kv.smembers(`user:${email}:following:players`)

    return NextResponse.json({
      ok: true,
      data: { leagues, players, teams },
    })
  } catch (error) {
    return NextResponse.json({ ok: false, error })
  }
}
