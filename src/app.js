const express = require('express');
const morgan = require('morgan');
const client = require('prom-client');

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

const app = express();
app.use(express.json());
app.use(morgan('dev'));

// Prometheus metrics
const register = new client.Registry();
client.collectDefaultMetrics({ register });
app.get('/metrics', async (_req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});

// Health check
app.get('/health', (_req, res) => res.status(200).json({ ok: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

module.exports = app;
