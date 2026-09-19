import { Resend } from 'resend';

// Required env vars: RESEND_API_KEY, ORDER_RECIPIENT_EMAIL.
// Local dev: set them in .env.local (gitignored, never committed).
// Vercel: Project Settings > Environment Variables > add both, applied to
// Production, Preview, and Development, then redeploy for the change to take effect.

// Resend's test sender — works without domain verification. Once bedofish.co.ke
// is verified in the Resend dashboard, switch this to 'Bedo Fish <orders@bedofish.co.ke>'.
const FROM = 'Bedo Fish <onboarding@resend.dev>';

export type OrderItem = {
  name: string;
  size: string;
  quantity: number;
  unitPrice: number;
  totalPrice: string;
  flavor?: string;
};

export type OrderPayload = {
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

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function deliveryTypeLabel(type: OrderPayload['deliveryType']): string {
  return type === 'pickup' ? 'In-Store Pickup' : 'Deliver To My Address';
}

function itemRow(item: OrderItem): string {
  return `
    <tr style="border-bottom:1px solid #e8e8e8;">
      <td style="padding:12px;color:#333;font-size:14px;">${escapeHtml(item.name)}</td>
      <td style="padding:12px;color:#555;font-size:14px;text-align:center;">${escapeHtml(item.size)}</td>
      <td style="padding:12px;color:#555;font-size:14px;text-align:center;">${item.flavor ? escapeHtml(item.flavor) : '&mdash;'}</td>
      <td style="padding:12px;color:#555;font-size:14px;text-align:center;">${item.quantity}</td>
      <td style="padding:12px;color:#555;font-size:14px;text-align:right;">Ksh ${item.unitPrice}</td>
      <td style="padding:12px;color:#014aad;font-weight:bold;font-size:14px;text-align:right;">Ksh ${escapeHtml(item.totalPrice)}</td>
    </tr>`;
}

function infoRow(label: string, value: string, bold = false): string {
  return `
    <tr>
      <td style="padding:8px 0;color:#555;font-size:14px;width:40%;">${label}</td>
      <td style="padding:8px 0;color:#333;font-size:14px;${bold ? 'font-weight:bold;' : ''}">${value}</td>
    </tr>`;
}

function orderSummarySection(p: OrderPayload): string {
  const rows = p.items.map(itemRow).join('');
  return `
  <tr>
    <td style="padding:32px;">
      <h2 style="color:#014aad;font-size:18px;margin:0 0 16px;border-bottom:2px solid #014aad;padding-bottom:8px;">Order Summary</h2>
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        <tr style="background:#014aad;">
          <th style="color:#ffffff;padding:10px 12px;text-align:left;font-size:13px;">Product</th>
          <th style="color:#ffffff;padding:10px 12px;text-align:center;font-size:13px;">Size</th>
          <th style="color:#ffffff;padding:10px 12px;text-align:center;font-size:13px;">Flavor</th>
          <th style="color:#ffffff;padding:10px 12px;text-align:center;font-size:13px;">Qty</th>
          <th style="color:#ffffff;padding:10px 12px;text-align:right;font-size:13px;">Unit Price</th>
          <th style="color:#ffffff;padding:10px 12px;text-align:right;font-size:13px;">Total</th>
        </tr>
        ${rows}
      </table>
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;border-collapse:collapse;">
        <tr>
          <td style="padding:8px 12px;color:#555;font-size:14px;">Subtotal</td>
          <td style="padding:8px 12px;color:#333;font-size:14px;text-align:right;">Ksh ${escapeHtml(p.subtotal)}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;color:#555;font-size:14px;">Delivery Fee</td>
          <td style="padding:8px 12px;color:#333;font-size:14px;text-align:right;">Ksh ${escapeHtml(p.deliveryFee)}</td>
        </tr>
        <tr style="border-top:2px solid #014aad;">
          <td style="padding:12px;color:#014aad;font-weight:bold;font-size:16px;">Total</td>
          <td style="padding:12px;color:#014aad;font-weight:bold;font-size:16px;text-align:right;">Ksh ${escapeHtml(p.total)}</td>
        </tr>
      </table>
    </td>
  </tr>`;
}

function shippingInfoSection(p: OrderPayload): string {
  const rows = [
    infoRow('Name', `${escapeHtml(p.firstName)} ${escapeHtml(p.lastName)}`, true),
    infoRow('Email', escapeHtml(p.email)),
    infoRow('Phone', escapeHtml(p.phone)),
    infoRow('Delivery Type', deliveryTypeLabel(p.deliveryType)),
  ];
  if (p.deliveryType === 'delivery' && p.deliveryLocation) {
    rows.push(infoRow('Delivery Location', escapeHtml(p.deliveryLocation)));
  }
  if (p.apartment) {
    rows.push(infoRow('Apartment', escapeHtml(p.apartment)));
  }
  return `
  <tr>
    <td style="padding:0 32px 32px;">
      <h2 style="color:#014aad;font-size:18px;margin:0 0 16px;border-bottom:2px solid #014aad;padding-bottom:8px;">Shipping Information</h2>
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        ${rows.join('')}
      </table>
    </td>
  </tr>`;
}

function emailShell(headerTitle: string, headerSubtitle: string, bodyRows: string, footerSubtext?: string): string {
  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background-color:#f4f4f4;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0">
  <tr>
    <td align="center" style="padding:40px 0;">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;">
        <tr>
          <td style="background:#014aad;padding:32px;text-align:center;">
            <h1 style="color:#ffffff;margin:0;font-size:24px;">${headerTitle}</h1>
            <p style="color:rgba(255,255,255,0.8);margin:8px 0 0;">${headerSubtitle}</p>
          </td>
        </tr>
        ${bodyRows}
        <tr>
          <td style="background:#014aad;padding:24px;text-align:center;">
            <p style="color:#ffffff;margin:0;font-size:13px;">Bedo Fish | info@bedofish.com | +254 722 144319</p>
            ${footerSubtext ? `<p style="color:rgba(255,255,255,0.7);margin:6px 0 0;font-size:12px;">${footerSubtext}</p>` : ''}
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

function buildOrderNotificationHtml(p: OrderPayload): string {
  return emailShell(
    'NEW ORDER ALERT',
    'A new order has been placed on Bedo Fish',
    orderSummarySection(p) + shippingInfoSection(p)
  );
}

function buildCustomerConfirmationHtml(p: OrderPayload): string {
  const paragraph = `
  <tr>
    <td style="padding:0 32px 8px;">
      <p style="color:#555;font-size:14px;line-height:1.6;margin:0;">A member of our dispatch team will contact you shortly to confirm your delivery details.</p>
    </td>
  </tr>`;
  return emailShell(
    `Thank you for your order, ${escapeHtml(p.firstName)}!`,
    'Your order has been received.',
    paragraph + orderSummarySection(p) + shippingInfoSection(p),
    'Thank you for supporting a sustainable food future from Lake Victoria.'
  );
}

export async function sendOrderEmails(payload: OrderPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error(
      'RESEND_API_KEY is not configured. Set it in .env.local for local development, ' +
      'and in the Vercel project\'s Environment Variables (Production, Preview, Development) for deployment.'
    );
  }
  const orderRecipient = process.env.ORDER_RECIPIENT_EMAIL;
  if (!orderRecipient) throw new Error('ORDER_RECIPIENT_EMAIL is not configured');

  const resend = new Resend(apiKey);

  try {
    await Promise.all([
      resend.emails.send({
        from: FROM,
        to: orderRecipient,
        subject: 'New Order!',
        html: buildOrderNotificationHtml(payload),
      }),
      resend.emails.send({
        from: FROM,
        to: payload.email,
        subject: 'Order Confirmed - Bedo Fish',
        html: buildCustomerConfirmationHtml(payload),
      }),
    ]);
  } catch (error) {
    console.error('Resend error:', error);
    throw error;
  }
}
