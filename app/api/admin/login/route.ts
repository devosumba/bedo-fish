import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';

export const runtime = 'nodejs';

// The authorized emails and password live only in env vars — never sent to the
// browser except as a pass/fail result, so they can't be read out of the client bundle.
export async function POST(req: NextRequest) {
  let body: { email?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  const password = body.password;

  const adminEmails = (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (
    !email ||
    !password ||
    !adminPassword ||
    !adminEmails.includes(email) ||
    password !== adminPassword
  ) {
    return NextResponse.json({ error: 'Invalid email or password. Access denied.' }, { status: 401 });
  }

  const token = randomBytes(24).toString('hex');
  return NextResponse.json({ ok: true, token, email });
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
