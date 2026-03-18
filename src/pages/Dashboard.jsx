import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardContent, Typography, TextField, Button, Stack, Snackbar, Alert, Paper, Container } from '@mui/material';
import { Wallet, ArrowRightLeft, Box as BoxIcon, Activity, TrendingUp } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function Dashboard() {
  const [stats, setStats] = useState({ wallets: 0, transactions: 0, blocks: 0 });
  
  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [recentTx, setRecentTx] = useState([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    // These queries are mock queries to mimic the requested counts. 
    // In a real scenario, you might have specific RPCs for these to avoid fetching all rows.
    const { count: walletsCount } = await supabase.from('wallets').select('*', { count: 'exact', head: true });
    const { count: txCount } = await supabase.from('transactions').select('*', { count: 'exact', head: true });
    const { count: blocksCount } = await supabase.from('audit_blocks').select('*', { count: 'exact', head: true });
    
    setStats({
      wallets: walletsCount || 0,
      transactions: txCount || 0,
      blocks: blocksCount || 0
    });

    const { data: txs } = await supabase.from('transactions').select('*').order('created_at', { ascending: false }).limit(5);
    setRecentTx(txs || []);
  };

  const handleTransfer = async (e) => {
    e.preventDefault();

    if (password !== 'dbms') {
      setToast({ variant: 'error', message: 'Invalid wallet authorization password.' });
      return;
    }

    setSubmitting(true);
    try {
      const { data, error } = await supabase.rpc('transfer_funds', {
        sender: parseInt(sender, 10),
        receiver: parseInt(receiver, 10),
        amt: parseFloat(amount),
        meta: { debug: true, source: 'ui_debug' }
      });

      if (error) throw error;

      setToast({ variant: 'success', message: `Transaction Success. ID: ${data || 'N/A'}` });
      setSender('');
      setReceiver('');
      setAmount('');
      setPassword('');
      fetchStats();
    } catch (err) {
      setToast({ variant: 'error', message: `ERROR: ${err.message}` });
    } finally {
      setSubmitting(false);
    }
  };

  const StatCard = ({ title, value, icon, color }) => (
    <Card sx={{ height: '100%', minHeight: '120px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden', borderRadius: '14px' }}>
      <CardContent sx={{ zIndex: 1, p: '18px', '&:last-child': { pb: '18px' } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: `rgba(${color}, 0.1)`, color: `rgb(${color})`, display: 'inline-flex' }}>
            {icon}
          </Box>
          <TrendingUp size={20} color="var(--success)" />
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography sx={{ fontSize: '14px', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</Typography>
          <Typography sx={{ fontSize: '28px', fontWeight: 600, mt: '6px', wordBreak: 'break-word' }}>{value}</Typography>
        </Box>
      </CardContent>
      {/* Decorative gradient background */}
      <Box sx={{ position: 'absolute', top: -50, right: -50, width: 150, height: 150, borderRadius: '50%', background: `radial-gradient(circle, rgba(${color},0.15) 0%, rgba(${color},0) 70%)` }} />
    </Card>
  );

  return (
    <Container maxWidth="xl" disableGutters>
      <Typography variant="h1" gutterBottom>Dashboard Overview</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Monitor wallet metrics, blockchain activity, and execute quick transfers.
      </Typography>

      {/* Cards Section */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '20px', 
        width: '100%',
        mb: 4
      }}>
        <Box sx={{ width: '100%', minHeight: '120px' }}>
          <StatCard title="Total Wallets" value={stats.wallets} icon={<Wallet size={24} />} color="255, 255, 255" />
        </Box>
        <Box sx={{ width: '100%', minHeight: '120px' }}>
          <StatCard title="Transactions" value={stats.transactions} icon={<ArrowRightLeft size={24} />} color="161, 161, 170" />
        </Box>
        <Box sx={{ width: '100%', minHeight: '120px' }}>
          <StatCard title="Blocks Mined" value={stats.blocks} icon={<BoxIcon size={24} />} color="113, 113, 122" />
        </Box>
      </Box>

      {/* Main Section */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', lg: '2.5fr 1fr' }, 
        gap: '24px', 
        width: '100%' 
      }}>
        <Card sx={{ width: '100%', height: '100%', minHeight: '420px' }}>
          <CardContent sx={{ p: '24px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{ p: 1, borderRadius: 1.5, bgcolor: 'rgba(255, 255, 255, 0.1)', color: 'var(--primary)', mr: 2 }}>
                <Activity size={20} />
              </Box>
              <Typography variant="h2">Activity Overview</Typography>
            </Box>
            
            <Box sx={{ height: 320, width: '100%', position: 'relative', mt: 4 }}>
              <svg viewBox="0 0 800 300" preserveAspectRatio="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                <defs>
                  <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <path d="M0 250 C 100 200, 200 250, 300 150 C 400 50, 500 180, 600 120 C 700 60, 800 150, 800 150 L 800 300 L 0 300 Z" fill="url(#colorPrimary)" />
                <path d="M0 250 C 100 200, 200 250, 300 150 C 400 50, 500 180, 600 120 C 700 60, 800 150, 800 150" fill="none" stroke="var(--primary)" strokeWidth="4" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
              </svg>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ width: '100%', height: '100%', minHeight: '420px' }}>
          <CardContent sx={{ p: '24px' }}>
            <Typography variant="h2" gutterBottom>Quick Transfer</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Execute a secure transaction between wallets.
            </Typography>

            <form onSubmit={handleTransfer}>
              <Stack spacing={3}>
                <TextField 
                  label="Sender Wallet ID" 
                  type="number"
                  required 
                  value={sender}
                  onChange={e => setSender(e.target.value)}
                />
                <TextField 
                  label="Receiver Wallet ID" 
                  type="number"
                  required 
                  value={receiver}
                  onChange={e => setReceiver(e.target.value)}
                />
                <TextField 
                  label="Amount" 
                  type="number"
                  required 
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                />
                <TextField 
                  label="Password" 
                  type="password"
                  required 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  helperText="Wallet authorization required"
                />
                <Button 
                  type="submit" 
                  variant="contained" 
                  size="large" 
                  disabled={submitting}
                  startIcon={<ArrowRightLeft size={18} />}
                  sx={{ mt: 2 }}
                >
                  {submitting ? 'Processing...' : 'Transfer Funds'}
                </Button>
              </Stack>
            </form>
          </CardContent>
        </Card>
      </Box>

      {/* Recent Transactions Table */}
      <Card sx={{ mt: 3, width: '100%', mb: 4 }}>
        <CardContent sx={{ p: '24px' }}>
          <Typography variant="h2" gutterBottom>Recent Transactions</Typography>
          <Box sx={{ overflowX: 'auto', mt: 3 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--muted-surface)', color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase' }}>
                  <th style={{ padding: '16px', fontWeight: 600 }}>Transaction ID</th>
                  <th style={{ padding: '16px', fontWeight: 600 }}>Sender</th>
                  <th style={{ padding: '16px', fontWeight: 600 }}>Receiver</th>
                  <th style={{ padding: '16px', fontWeight: 600 }}>Amount</th>
                  <th style={{ padding: '16px', fontWeight: 600 }}>Status</th>
                  <th style={{ padding: '16px', fontWeight: 600 }}>Time</th>
                </tr>
              </thead>
              <tbody>
                {recentTx.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>No transactions found</td>
                  </tr>
                ) : (
                  recentTx.map(tx => (
                    <tr key={tx.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', fontSize: '14px', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                      <td style={{ padding: '16px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>#{tx.id}</td>
                      <td style={{ padding: '16px', fontWeight: 500 }}>Wallet {tx.sender_wallet_id}</td>
                      <td style={{ padding: '16px', fontWeight: 500 }}>Wallet {tx.receiver_wallet_id}</td>
                      <td style={{ padding: '16px', color: 'var(--success)', fontWeight: 600 }}>${parseFloat(tx.amount).toFixed(2)}</td>
                      <td style={{ padding: '16px' }}>
                        <span style={{ padding: '4px 12px', borderRadius: '12px', backgroundColor: 'rgba(34, 197, 94, 0.1)', color: 'var(--success)', fontSize: '12px', fontWeight: 600 }}>Completed</span>
                      </td>
                      <td style={{ padding: '16px', color: 'var(--text-muted)' }}>{new Date(tx.created_at).toLocaleString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </Box>
        </CardContent>
      </Card>



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
    </Container>
  );
}
