import express from 'express';
import { Resend } from 'resend';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

const apiKey = process.env.API_KEY;
console.log(apiKey);
const resend = new Resend(apiKey);

// Ruta para enviar el correo electrónico
app.get('/send-email', async (req, res) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Ahora si <onboarding@resend.dev>',
      to: ['aulioroveroparedes@gmail.com'],
      subject: 'De nuevo probando',
      html: '<strong>Vamos!</strong>',
    });

    if (error) {
      return res.status(500).json({ error: 'Error al enviar el correo electrónico' });
    }

    return res.status(200).json({ data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Iniciar el servidor Express
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
