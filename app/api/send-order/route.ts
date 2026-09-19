import { NextRequest, NextResponse } from 'next/server';
import { sendWhatsAppMessage } from '../../../lib/whatsapp';
import { sendOrderEmails, OrderPayload } from '../../../lib/resend-email';

export const runtime = 'nodejs';

function formatWhatsAppMessage(p: OrderPayload): string {
  const itemLines = p.items
    .map((item) => {
      const lines = [`- ${item.name} (${item.size}) x${item.quantity}`];
      if (item.flavor) lines.push(`  Flavor: ${item.flavor}`);
      lines.push(`  Item Total: Ksh ${item.totalPrice}`);
      return lines.join('\n');
    })
    .join('\n\n');

  const shippingLines = [
    `Name: ${p.firstName} ${p.lastName}`,
    `Email: ${p.email}`,
    `Phone: ${p.phone}`,
    `Delivery Type: ${p.deliveryType === 'pickup' ? 'In-Store Pickup' : 'Deliver To My Address'}`,
    ...(p.deliveryType === 'delivery' && p.deliveryLocation
      ? [`Delivery Location: ${p.deliveryLocation}`]
      : []),
    ...(p.apartment ? [`Apartment: ${p.apartment}`] : []),
  ];

  return [
    'NEW ORDER ALERT',
    '',
    'ORDER SUMMARY',
    '─────────────────',
    itemLines,
    '',
    `Subtotal: Ksh ${p.subtotal}`,
    `Delivery Fee: Ksh ${p.deliveryFee}`,
    `Total: Ksh ${p.total}`,
    '',
    'SHIPPING INFORMATION',
    '─────────────────',
    ...shippingLines,
  ].join('\n');
}

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
  // TEMPORARY — remove after confirming RESEND_API_KEY is picked up in this environment.
  console.log('RESEND_API_KEY present:', !!process.env.RESEND_API_KEY);
  console.log('RESEND_API_KEY prefix:', process.env.RESEND_API_KEY?.substring(0, 8));

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
    const recipient = process.env.WHATSAPP_RECIPIENT || '254704870276';

    await Promise.all([
      sendOrderEmails(payload),
      sendWhatsAppMessage(recipient, formatWhatsAppMessage(payload)).catch((err) => {
        console.error('[send-order] WhatsApp failed', err);
      }),
    ]);

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
