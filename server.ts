import 'dotenv/config';
import express, {type Request, type Response} from 'express';
import nodemailer from 'nodemailer';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type DeliveryProvider = 'smtp' | 'resend' | 'webhook' | null;

interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function getEmailProvider(): DeliveryProvider {
  if (
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS
  ) {
    return 'smtp';
  }
  if (process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL) {
    return 'resend';
  }
  if (process.env.CONTACT_WEBHOOK_URL) {
    return 'webhook';
  }
  return null;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function sanitizeText(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}

async function sendViaSmtp(payload: ContactPayload): Promise<void> {
  const port = Number(process.env.SMTP_PORT || '587');
  const secure =
    process.env.SMTP_SECURE === 'true' || port === 465;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const toAddress =
    process.env.CONTACT_TO_EMAIL ||
    process.env.SMTP_USER ||
    'olag29144@gmail.com';
  const fromAddress =
    process.env.CONTACT_FROM_EMAIL ||
    `GABBY TEQ Portfolio <${process.env.SMTP_USER}>`;

  await transporter.sendMail({
    from: fromAddress,
    to: toAddress,
    replyTo: `${payload.name} <${payload.email}>`,
    subject: `[GABBY TEQ Portfolio] ${payload.subject}`,
    text: [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Subject: ${payload.subject}`,
      '',
      payload.message,
    ].join('\n'),
  });
}

async function sendViaResend(payload: ContactPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY || '';
  const toAddress = process.env.CONTACT_TO_EMAIL || 'olag29144@gmail.com';
  const fromAddress =
    process.env.CONTACT_FROM_EMAIL ||
    'GABBY TEQ Portfolio <onboarding@resend.dev>';

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromAddress,
      to: [toAddress],
      reply_to: payload.email,
      subject: `[GABBY TEQ Portfolio] ${payload.subject}`,
      text: [
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        `Subject: ${payload.subject}`,
        '',
        payload.message,
      ].join('\n'),
    }),
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => 'Resend error');
    throw new Error(`Resend API error (${response.status}): ${errText}`);
  }
}

async function sendViaWebhook(payload: ContactPayload): Promise<void> {
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL || '';
  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      source: 'gabby-teq-portfolio',
      submittedAt: new Date().toISOString(),
      ...payload,
    }),
  });

  if (!response.ok) {
    throw new Error(`Webhook error (${response.status})`);
  }
}

async function startServer() {
  const app = express();
  const port =
    process.env.NODE_ENV !== 'production' ||
    (process.env.NGINX_PORT && process.env.PORT === process.env.NGINX_PORT)
      ? Number(process.env.DEFAULT_APP_PORT || '3000')
      : Number(process.env.PORT || '3000');

  app.use(express.json({limit: '1mb'}));

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ok: true});
  });

  app.get('/api/contact/status', (_req: Request, res: Response) => {
    const provider = getEmailProvider();
    res.json({
      configured: provider !== null,
      provider,
    });
  });

  app.post('/api/contact', async (req: Request, res: Response) => {
    const name = sanitizeText(req.body?.name, 120);
    const email = sanitizeText(req.body?.email, 160);
    const subject = sanitizeText(req.body?.subject, 180);
    const message = sanitizeText(req.body?.message, 5000);

    if (!name || !email || !subject || !message) {
      res.status(400).json({
        ok: false,
        configured: getEmailProvider() !== null,
        error: 'Please fill out your name, email, subject, and message.',
      });
      return;
    }

    if (!isValidEmail(email)) {
      res.status(400).json({
        ok: false,
        configured: getEmailProvider() !== null,
        error: 'Please enter a valid email address.',
      });
      return;
    }

    const provider = getEmailProvider();
    if (!provider) {
      res.status(501).json({
        ok: false,
        configured: false,
        delivered: false,
        error:
          'Automated email delivery is not configured on the server yet. Please use your email app or copy your message below.',
      });
      return;
    }

    try {
      const payload: ContactPayload = {name, email, subject, message};
      if (provider === 'smtp') {
        await sendViaSmtp(payload);
      } else if (provider === 'resend') {
        await sendViaResend(payload);
      } else if (provider === 'webhook') {
        await sendViaWebhook(payload);
      }

      res.status(200).json({
        ok: true,
        configured: true,
        delivered: true,
        provider,
        message: 'Your inquiry has been delivered.',
      });
    } catch (error) {
      console.error('Contact submission failed:', error);
      res.status(502).json({
        ok: false,
        configured: true,
        delivered: false,
        error:
          'The email server could not complete delivery right now. Please try sending directly via your email app.',
      });
    }
  });

  const isDevMode =
    process.env.NODE_ENV !== 'production' &&
    process.env.npm_lifecycle_event !== 'start';

  if (isDevMode) {
    const {createServer: createViteServer} = await import('vite');
    const vite = await createViteServer({
      server: {middlewareMode: true},
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('/{*splat}', (_req: Request, res: Response) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`GABBY TEQ server running on http://0.0.0.0:${port}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
