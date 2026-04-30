// SETUP: On first run scan the QR code printed in the terminal with the WhatsApp account that will
// send order notifications. The session is saved to .whatsapp-session/ and persists across restarts.
// The QR code will only appear once unless the session is deleted or the WhatsApp account logs out.
//
// VERCEL / SERVERLESS NOTE: Baileys requires a persistent server environment (Railway, Render, VPS)
// because it maintains a long-lived WebSocket connection and writes session credentials to the
// filesystem. Vercel's serverless functions have an ephemeral filesystem — the session cannot
// survive between invocations, and the QR scan would be required on every cold start.
// On Vercel the sendWhatsAppMessage call will silently fail and the Nodemailer email fallback
// (lib/email.ts) will handle order notifications until a persistent backend is deployed.

import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
} from '@whiskeysockets/baileys';
import qrcodeTerminal from 'qrcode-terminal';
import path from 'path';

const SESSION_PATH = path.resolve(process.env.WHATSAPP_SESSION_PATH || '.whatsapp-session');

const noopLogger = {
  level: 'silent',
  fatal: () => {},
  error: (obj: unknown) => console.error('[WhatsApp]', obj),
  warn: () => {},
  info: () => {},
  debug: () => {},
  trace: () => {},
  child: () => noopLogger,
} as unknown as import('pino').Logger;

// Persist the socket across hot-reloads in dev via global
declare global {
  // eslint-disable-next-line no-var
  var __waSock: ReturnType<typeof makeWASocket> | undefined;
  var __waReady: boolean;
  var __waConnecting: boolean;
}

global.__waReady = global.__waReady ?? false;
global.__waConnecting = global.__waConnecting ?? false;

async function getSocket(): Promise<ReturnType<typeof makeWASocket>> {
  if (global.__waSock && global.__waReady) return global.__waSock;

  if (global.__waConnecting) {
    return new Promise((resolve, reject) => {
      const start = Date.now();
      const interval = setInterval(() => {
        if (global.__waSock && global.__waReady) {
          clearInterval(interval);
          resolve(global.__waSock!);
        } else if (Date.now() - start > 60_000) {
          clearInterval(interval);
          reject(new Error('WhatsApp connection timeout after 60s'));
        }
      }, 500);
    });
  }

  global.__waConnecting = true;

  const { state, saveCreds } = await useMultiFileAuthState(SESSION_PATH);

  let version: [number, number, number] = [2, 3000, 1017531287];
  try {
    const v = await fetchLatestBaileysVersion();
    version = v.version;
  } catch {
    console.warn('[WhatsApp] Could not fetch latest version, using fallback');
  }

  const sock = makeWASocket({
    version,
    auth: state,
    printQRInTerminal: false,
    logger: noopLogger,
  });

  global.__waSock = sock;

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      console.log('\n[WhatsApp] Scan this QR code to authenticate:\n');
      qrcodeTerminal.generate(qr, { small: true });
      console.log('[WhatsApp] Open WhatsApp → Linked Devices → Link a Device\n');
    }

    if (connection === 'close') {
      global.__waReady = false;
      const statusCode = (lastDisconnect?.error as { output?: { statusCode?: number } })?.output?.statusCode;
      const loggedOut = statusCode === DisconnectReason.loggedOut;
      console.log(`[WhatsApp] Connection closed (status ${statusCode}). Reconnect: ${!loggedOut}`);

      if (!loggedOut) {
        global.__waConnecting = false;
        global.__waSock = undefined;
        setTimeout(() => getSocket().catch(console.error), 5_000);
      } else {
        console.error('[WhatsApp] Logged out. Delete .whatsapp-session/ and restart to re-authenticate.');
        global.__waConnecting = false;
      }
    }

    if (connection === 'open') {
      global.__waReady = true;
      global.__waConnecting = false;
      console.log('[WhatsApp] Connected and ready to send messages.');
    }
  });

  return sock;
}

// Kick off connection on module load so QR appears as soon as the server starts
getSocket().catch((err) => console.error('[WhatsApp] Init error:', err));

export async function sendWhatsAppMessage(phone: string, message: string): Promise<void> {
  try {
    const sock = await getSocket();
    const jid = phone.includes('@') ? phone : `${phone}@s.whatsapp.net`;
    await sock.sendMessage(jid, { text: message });
    console.log(`[WhatsApp] Message sent to ${jid}`);
  } catch (err) {
    console.error('[WhatsApp] Failed to send message:', err);
    // Intentionally not re-throwing — caller falls through to email fallback
  }
}
