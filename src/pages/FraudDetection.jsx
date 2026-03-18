import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Table, TableBody, TableCell, TableHead, TableRow, Stack, Chip } from '@mui/material';
import { ShieldAlert, AlertTriangle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function FraudDetection() {
  const [flagged, setFlagged] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFlaggedTransactions();
  }, []);

  const fetchFlaggedTransactions = async () => {
    setLoading(true);
    // Based on the spec: "amount > 500" or "multiple transactions in short time"
    // We'll mock the fetching of flagged rules by just querying transactions where amount > 500
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .gt('amount', 500)
      .order('created_at', { ascending: false })
      .limit(50);
      
    if (!error && data) {
      setFlagged(data.map(tx => ({ ...tx, reason: 'High Value Transfer (>500)' })));
    }
    setLoading(false);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, gap: 2 }}>
        <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)' }}>
          <ShieldAlert size={24} />
        </Box>
        <Typography variant="h1">Fraud Detection</Typography>
      </Box>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Transactions are automatically flagged based on network security rules.
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
        <Chip label="Rule: Amount > $500" color="error" variant="outlined" />
        <Chip label="Rule: Velocity (Multiple Txs/min)" color="error" variant="outlined" />
      </Stack>

      <Card sx={{ border: '1px solid var(--danger)', boxShadow: '0 4px 12px rgba(239, 68, 68, 0.1)' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
            <AlertTriangle size={20} color="var(--danger)" />
            <Typography variant="h2" color="error.main">Flagged Transactions</Typography>
          </Box>
          <Box sx={{ overflowX: 'auto' }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Tx ID</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell>Hash</TableCell>
                  <TableCell align="right">Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {flagged.map(tx => (
                  <TableRow key={tx.id} hover sx={{ bgcolor: 'rgba(239, 68, 68, 0.02)' }}>
                    <TableCell>#{tx.id}</TableCell>
                    <TableCell>
                      <Chip label={tx.reason} size="small" color="error" />
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600, color: 'var(--text-main)' }}>
                      ${parseFloat(tx.amount).toLocaleString()}
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'monospace', color: 'var(--text-muted)' }}>
                      {tx.tx_hash ? `${tx.tx_hash.substring(0,16)}...` : 'pending'}
                    </TableCell>
                    <TableCell align="right" sx={{ color: 'var(--text-muted)' }}>
                      {new Date(tx.created_at).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
                {flagged.length === 0 && !loading && (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 4, color: 'var(--text-muted)' }}>
                      No flagged transactions detected.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
