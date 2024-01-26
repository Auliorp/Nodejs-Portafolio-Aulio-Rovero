import express from 'express';
import { Resend } from 'resend';
import dotenv from 'dotenv'

dotenv.config();
const app = express();
const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.error('API_KEY no está configurada. Asegúrate de proporcionarla en el archivo .env.');
  process.exit(1);
}

const resend = new Resend(apiKey);

app.use(express.json());

app.get('/Send-mail', async (req, res) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Express Docu <onboarding@resend.dev>',
      to: ['aulioroveroparedes@gmail.com'],
      subject: 'Con la documentacion',
      html: '<strong>it Vamoo!</strong>',
    });

    if (error) {
      console.error('Error al enviar el correo electrónico:', error);
      return res.status(500).json({ error: 'Error al enviar el correo electrónico' });
    }

    res.status(200).json({ data });
  } catch (err) {
    console.error('Error interno del servidor:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
