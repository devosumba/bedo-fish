import { NextRequest, NextResponse } from 'next/server';
import { sendOrderEmails, OrderPayload } from '../../../lib/resend-email';

export const runtime = 'nodejs';

function validateOrder(body: Partial<OrderPayload>): string | null {
  if (!body.firstName?.trim()) return 'First name is required';
  if (!body.lastName?.trim()) return 'Last name is required';
  if (!body.email?.trim()) return 'Email is required';
  if (!body.phone?.trim()) return 'Phone number is required';
  if (!body.deliveryType) return 'Delivery type is required';
  if (body.deliveryType === 'delivery' && !body.deliveryLocation?.trim()) {
    return 'Delivery location is required for delivery orders';
  }
  if (!body.items?.length) return 'At least one order item is required';
  if (!body.subtotal || !body.total) return 'Order totals are required';
  return null;
}

export async function POST(req: NextRequest) {
  let body: Partial<OrderPayload>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const validationError = validateOrder(body);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const payload = body as OrderPayload;

  try {
    await sendOrderEmails(payload);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[send-order]', err);
    const message = err instanceof Error ? err.message : 'Failed to process order. Please try again.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
