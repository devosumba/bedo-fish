import nodemailer from 'nodemailer';

const RECIPIENTS = [
  'osagarichard4@gmail.com',
  'suelazarovor@gmail.com',
  'allan7b@gmail.com',
];

export async function sendOrderEmail(subject: string, text: string): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: RECIPIENTS.join(', '),
    subject,
    text,
  });
}
