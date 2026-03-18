import React, { useState } from 'react';
import { Box, Card, Typography, TextField, Button, Stack, Alert } from '@mui/material';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

export function Landing() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    // In a real app we might use OTP or password. Here we use basic sign in / sign up wrapper for demo.
    // If you don't have a password column, Magic Link is another typical approach.
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin + '/dashboard',
      }
    });

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Check your email for the login link!');
    }
    setLoading(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3 }}>
      <Box sx={{ width: '100%', maxWidth: 440 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <img src="/logo.svg" alt="Blockchain Logo" style={{ height: 48, marginBottom: 24 }} />
          <Typography variant="h1" gutterBottom>
            TrustLedger
          </Typography>
          <Typography variant="body1" sx={{ color: 'var(--accent)' }}>
            A tamper-evident audit ledger. Create transactions, explore blocks, verify integrity.
          </Typography>
        </Box>

        <Card sx={{ p: 'var(--card-padding)', borderRadius: 'var(--radius)' }}>
          {message && (
            <Alert severity={message.startsWith('Error') ? 'error' : 'success'} sx={{ mb: 3 }}>
              {message}
            </Alert>
          )}
          
          <form onSubmit={handleLogin}>
            <Stack spacing={3}>
              <TextField
                label="Email Address"
                variant="outlined"
                fullWidth
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                placeholder="alice@example.com"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: 'var(--primary)',
                  }
                }}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                fullWidth
              >
                {loading ? 'Sending link...' : 'Sign In / Sign Up'}
              </Button>
            </Stack>
          </form>

          <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid var(--muted-surface)', textAlign: 'center' }}>
            <Typography variant="caption" sx={{ color: 'var(--accent)' }}>
              Use Supabase Auth. Admin keys must be server-side only.
            </Typography>
            <br />
            <Button size="small" variant="text" sx={{ mt: 1 }} onClick={() => navigate('/dashboard')}>
              Bypass for Demo (Go to Dashboard)
            </Button>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}
