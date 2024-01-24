import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();


const apiKey = process.env.API_KEY;
console.log(apiKey)
const resend = new Resend(apiKey);

(async function () {
  const { data, error } = await resend.emails.send({
    from: 'Ahora si <onboarding@resend.dev>',
    to: ['aulioroveroparedes@gmail.com'],
    subject: 'De nuevo probando',
    html: '<strong>Vamos!</strong>',
  });

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
})();