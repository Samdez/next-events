import { env } from '@/env';
import { Resend } from 'resend';

const resend = new Resend(env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, message } = await request.json();

    const data = await resend.emails.send({
      // from: email,
      // to: env.GOAZEN_EMAIL_ADDRESS,
      from: 'onboarding@resend.dev',
      to: env.GOAZEN_EMAIL_ADDRESS,
      subject: 'Nouveau message',
      text: `Nouveau mail de : ${email}, ${message}`,
      reply_to: email,
    });
  } catch (error) {
    return Response.json({ error });
  }
}
