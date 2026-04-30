import { NextRequest, NextResponse } from 'next/server';
import { sendWhatsAppMessage } from '../../../lib/whatsapp';
import { sendOrderEmail } from '../../../lib/email';

export const runtime = 'nodejs';

type OrderItem = {
  name: string;
  size: string;
  quantity: number;
  unitPrice: number;
  totalPrice: string;
  flavor?: string;
};

type OrderPayload = {
  items: OrderItem[];
  subtotal: string;
  deliveryFee: string;
  total: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  deliveryType: 'pickup' | 'delivery';
  deliveryLocation?: string;
  apartment?: string;
};

function formatMessage(p: OrderPayload): string {
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

export async function POST(req: NextRequest) {
  try {
    const body: OrderPayload = await req.json();

    const { items, subtotal, deliveryFee, total, firstName, lastName, email, phone, deliveryType } = body;
    if (!items?.length || !subtotal || !total || !firstName || !lastName || !email || !phone || !deliveryType) {
      return NextResponse.json({ error: 'Missing required order fields' }, { status: 400 });
    }

    const message = formatMessage(body);
    const recipient = process.env.WHATSAPP_RECIPIENT || '254704870276';

    await Promise.allSettled([
      sendWhatsAppMessage(recipient, message),
      sendOrderEmail('New Bedo Fish Order', message),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[send-order]', err);
    return NextResponse.json({ error: 'Failed to process order. Please try again.' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
