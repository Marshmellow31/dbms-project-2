import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, Table, TableBody, TableCell, TableHead, TableRow, Stack, Grid, Snackbar, Alert } from '@mui/material';
import { Wallet, Plus } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function Wallets() {
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchWallets();
  }, []);

  const fetchWallets = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('wallets').select('*').order('id', { ascending: true }).limit(50);
    if (!error && data) {
      setWallets(data);
    }
    setLoading(false);
  };

  const handleCreateWallet = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { error } = await supabase.rpc('create_wallet', {
        p_name: name,
        p_balance: parseFloat(balance) || 0,
        p_password: password,
        p_metadata: { source: 'ui' }
      });

      if (error) throw error;

      setToast({ variant: 'success', message: `Wallet created successfully!` });
      setName('');
      setBalance('');
      setPassword('');
      fetchWallets();
    } catch (err) {
      setToast({ variant: 'error', message: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, gap: 2 }}>
        <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)' }}>
          <Wallet size={24} />
        </Box>
        <Typography variant="h1">Wallets</Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h2" gutterBottom>All Wallets</Typography>
              <Box sx={{ overflowX: 'auto', mt: 3 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Address/Hash</TableCell>
                      <TableCell align="right">Balance</TableCell>
                      <TableCell align="right">Created</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {wallets.map(wallet => (
                      <TableRow key={wallet.id} hover>
                        <TableCell>{wallet.id}</TableCell>
                        <TableCell sx={{ fontWeight: 500 }}>{wallet.name}</TableCell>
                        <TableCell sx={{ fontFamily: 'monospace', color: 'var(--text-muted)' }}>
                          {wallet.address || `0x${Math.random().toString(16).slice(2, 10)}...`}
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600, color: 'var(--success)' }}>
                          ${parseFloat(wallet.balance).toLocaleString()}
                        </TableCell>
                        <TableCell align="right" sx={{ color: 'var(--text-muted)' }}>
                          {new Date(wallet.created_at).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                    {wallets.length === 0 && !loading && (
                      <TableRow>
                        <TableCell colSpan={5} align="center" sx={{ py: 4, color: 'var(--text-muted)' }}>
                          No wallets found. Create one to get started.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ position: 'sticky', top: 100 }}>
            <CardContent>
              <Typography variant="h2" gutterBottom>Create Wallet</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Generate a new wallet address and initialize balance.
              </Typography>

              <form onSubmit={handleCreateWallet}>
                <Stack spacing={3}>
                  <TextField 
                    label="Wallet Name" 
                    required 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Treasury"
                  />
                  <TextField 
                    label="Initial Balance" 
                    type="number"
                    required 
                    value={balance}
                    onChange={e => setBalance(e.target.value)}
                    placeholder="0.00"
                  />
                  <TextField 
                    label="Password" 
                    type="password"
                    required 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter wallet password"
                  />
                  <Button 
                    type="submit" 
                    variant="contained" 
                    size="large" 
                    disabled={submitting}
                    startIcon={<Plus size={18} />}
                    sx={{ mt: 2 }}
                  >
                    {submitting ? 'Creating...' : 'Create Wallet'}
                  </Button>
                </Stack>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Snackbar 
        open={!!toast} 
        autoHideDuration={6000} 
        onClose={() => setToast(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setToast(null)} severity={toast?.variant || 'info'} sx={{ width: '100%' }}>
          {toast?.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
