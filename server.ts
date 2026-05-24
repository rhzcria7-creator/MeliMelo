import express from 'express';
import ViteExpress from 'vite-express'; 
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';
import { createServer as createViteServer } from 'vite';
import { setupDatabase, query } from './src/backend/database';
import { google } from 'googleapis';
import { GoogleGenAI } from '@google/genai';

const app = express();
app.set('trust proxy', 1);

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Security & Hardening
app.use(helmet({
  contentSecurityPolicy: false, // Vite dev server support
  crossOriginEmbedderPolicy: false,
  xssFilter: true,
  noSniff: true,
  hidePoweredBy: true,
  frameguard: { action: 'deny' }
}));

app.use(cors({
  origin: process.env.APP_URL || '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10kb' })); // Anti-flood payload limit
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Anti-bot & Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 50, // Stricter limit
  validate: { xForwardedForHeader: false, trustProxy: false },
  message: { error: 'Limite de requisições excedido. Tente novamente mais tarde.' }
});
app.use('/api/', apiLimiter);

setupDatabase();

// Google Gen AI Client (Server Side Only)
const ai = process.env.GEMINI_API_KEY ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }) : null;

// Mock form submission
async function submitToGoogleForms(data: any) {}

// AI Support Route
app.post('/api/chat', [
  body('message').notEmpty().trim().escape().isLength({ max: 500 })
], async (req: express.Request, res: express.Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  if (!ai) {
    return res.json({ reply: 'Oi! Meus poderes mágicos estão descansando agora, mas você pode usar a página de contato para falar com a gente!' });
  }

  try {
    const { message } = req.body;
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: `Você é a Meli, uma assistente virtual super simpática, carinhosa e mágica do estúdio infantil MeliMelo.
        Sua missão é ajudar os pais e visitantes do site com dúvidas sobre músicas, personagens, e parcerias.
        Tom de voz: Muito amigável, premium, mágico, infantil (mas respeitoso com os pais), usando emojis fofos como 🐝, ✨, 🎵.
        Responda de forma concisa. O email de contato é melimelo.oficial@outlook.com.
        Se perguntarem sobre músicas, diga que temos o Álbum 1 disponível no Spotify com músicas lindas como 'BZZZ BOM DIA!'.
        Proteja a marca: Nunca seja mal educada, nunca gere conteúdo inapropriado.`,
        temperature: 0.7,
      }
    });
    res.json({ reply: response.text });
  } catch (err) {
    console.error('AI Error:', err);
    res.json({ reply: 'Ops! Caiu um pinguinho de mel nos meus circuitos 🐝. Tente novamente daqui a pouco!' });
  }
});

// Forms with Honeypot
const honeypotCheck = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.body._honeypot) {
    // Bot detected
    return res.status(200).json({ success: true, redirectUrl: '/' }); // Fake success
  }
  next();
};

app.post('/api/contact', honeypotCheck, [
  body('name').notEmpty().trim().escape().isLength({ max: 100 }),
  body('email').isEmail().normalizeEmail(),
  body('message').notEmpty().trim().escape().isLength({ max: 2000 })
], async (req: express.Request, res: express.Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, email, message } = req.body;
  try {
    await query('INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3)', [name, email, message]);
    
    const subject = encodeURIComponent(`Contato MeliMelo - ${name}`);
    const bodyText = encodeURIComponent(`Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`);
    const to = 'melimelo.oficial@outlook.com';

    let providerLink = `mailto:${to}?subject=${subject}&body=${bodyText}`;
    if (email.includes('@gmail.com')) {
      providerLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${bodyText}`;
    }

    res.json({ success: true, redirectUrl: providerLink });
  } catch (err) {
    console.error(err);
    res.json({ success: true, redirectUrl: `mailto:melimelo.oficial@outlook.com` });
  }
});

app.post('/api/partnership', honeypotCheck, [
  body('name').notEmpty().trim().escape().isLength({ max: 100 }),
  body('company').optional().trim().escape().isLength({ max: 100 }),
  body('email').isEmail().normalizeEmail(),
  body('instagram').optional().trim().escape(),
  body('tiktok').optional().trim().escape(),
  body('youtube').optional().trim().escape(),
  body('type').notEmpty().trim().escape(),
  body('message').notEmpty().trim().escape().isLength({ max: 2000 })
], async (req: express.Request, res: express.Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, company, email, instagram, tiktok, youtube, type, message } = req.body;
  try {
    await query(
      'INSERT INTO partnerships (name, company, email, instagram, tiktok, youtube, type, message) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [name, company || null, email, instagram || null, tiktok || null, youtube || null, type, message]
    );

    await submitToGoogleForms(req.body);

    const subject = encodeURIComponent(`Nova Parceria MeliMelo - ${company || name}`);
    const bodyText = encodeURIComponent(`Parceria: ${type}\nNome: ${name}\nEmpresa: ${company}\n\nMensagem:\n${message}`);
    const to = 'melimelo.oficial@outlook.com';

    let providerLink = `mailto:${to}?subject=${subject}&body=${bodyText}`;
    if (email.includes('@gmail.com')) {
      providerLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${bodyText}`;
    }

    res.json({ success: true, redirectUrl: providerLink });
  } catch (err) {
    console.error(err);
    res.json({ success: true, redirectUrl: `mailto:melimelo.oficial@outlook.com` });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: "spa" });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => res.sendFile(path.join(distPath, 'index.html')));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running professionally on port ${PORT}`);
  });
}

startServer();
