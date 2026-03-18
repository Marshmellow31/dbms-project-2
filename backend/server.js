import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load .env
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
app.use(cors());
app.use(express.json());

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('WARNING: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing in backend/.env');
}

const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseServiceKey || 'placeholder');

// /api/log endpoint (Server-side write)
app.post('/api/log', async (req, res) => {
  try {
    const { action, payload, actor } = req.body;

    if (!action || !payload || !actor) {
      return res.status(400).json({ error: 'Missing action, payload, or actor' });
    }

    // Server-side composition of payload and metadata
    const composedPayload = {
      action,
      ...payload
    };

    const composedMetadata = {
      actor,
      source: 'api',
      timestamp: new Date().toISOString()
    };

    // Insert block via RPC
    const { data: block_id, error } = await supabase.rpc('insert_audit_block', {
      p_payload: composedPayload,
      p_metadata: composedMetadata
    });

    if (error) {
      console.error('Supabase RPC Error:', error);
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ block_id, message: 'Transaction recorded successfully.' });
  } catch (err) {
    console.error('Internal Server Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
