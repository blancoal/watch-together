const express = require('express');
const admin = require('firebase-admin');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
// app.use(cors());

const frontendURL = process.env.FRONTEND_URL_BASE;

const getAllowedOrigins = () => {
  const frontEndUrlPortSuffix = process.env.FRONTEND_URL_PORT_SUFFIX;
  if (frontEndUrlPortSuffix) {
    return [
      `${frontendURL}-3000${frontEndUrlPortSuffix}`,
      `${frontendURL}${frontEndUrlPortSuffix}`,
    ];
  }
  return [frontendURL];
};

app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = getAllowedOrigins();
    console.log(allowedOrigins);
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204
}));

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

app.get('/api/token', async (req, res) => {
  try {
    const token = await admin.auth().createCustomToken('app-client');
    console.log('Token generated successfully');
    res.json({ token });
  } catch (error) {
    console.error('Error generating token:', error);
    res.status(500).json({ error: 'Failed to generate token' });
  }
});

const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));

