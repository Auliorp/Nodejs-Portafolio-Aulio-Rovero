import express from 'express';
import { Resend } from 'resend';
import dotenv from 'dotenv'
import cors from 'cors';

dotenv.config();
const app = express();
const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.error('API_KEY no está configurada. Asegúrate de proporcionarla en el archivo .env.');
  process.exit(1);
}

const resend = new Resend(apiKey);

const corsOptions = {
  origin: 'http://localhost:5173', // Reemplaza con el dominio de tu aplicación React
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

// Middleware para permitir solicitudes CORS
app.use(cors(corsOptions));

// Middleware para analizar el cuerpo de solicitudes con formato JSON
app.use(express.json());

app.get('/Send-mail', async (req, res) => {

  const { Name, mail, Description } = req.body;
  try {
    const { data, error } = await resend.emails.send({
      from: 'Consulta realizada desde el Portafolio <onboarding@resend.dev>',
      to: ['aulioroveroparedes@gmail.com'],
      subject: 'Informacion Importante',
      html: `<strong>Name:</strong> ${Name}<br><strong>Email:</strong> ${mail}<br><strong>Description:</strong> ${Description}`,
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
