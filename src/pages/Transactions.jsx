import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Table, TableBody, TableCell, TableHead, TableRow, Chip } from '@mui/material';
import { ArrowRightLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('transactions').select('*').order('id', { ascending: false }).limit(50);
    if (!error && data) {
      setTransactions(data);
    }
    setLoading(false);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, gap: 2 }}>
        <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'rgba(34, 197, 94, 0.1)', color: 'var(--success)' }}>
          <ArrowRightLeft size={24} />
        </Box>
        <Typography variant="h1">Transactions</Typography>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h2" gutterBottom>Recent Transfers</Typography>
          <Box sx={{ overflowX: 'auto', mt: 3 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Tx ID</TableCell>
                  <TableCell>Sender ID</TableCell>
                  <TableCell>Receiver ID</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell>Hash</TableCell>
                  <TableCell align="right">Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map(tx => (
                  <TableRow key={tx.id} hover>
                    <TableCell>{tx.id}</TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>#{tx.sender_wallet_id}</TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>#{tx.receiver_wallet_id}</TableCell>
                    <TableCell align="right">
                      <Chip 
                        label={`$${parseFloat(tx.amount).toLocaleString()}`} 
                        size="small" 
                        sx={{ bgcolor: 'rgba(34, 197, 94, 0.1)', color: 'var(--success)', fontWeight: 600, borderRadius: 1 }} 
                      />
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'monospace', color: 'var(--text-muted)' }}>
                      {tx.tx_hash ? `${tx.tx_hash.substring(0,16)}...` : 'pending'}
                    </TableCell>
                    <TableCell align="right" sx={{ color: 'var(--text-muted)' }}>
                      {new Date(tx.created_at).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
                {transactions.length === 0 && !loading && (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 4, color: 'var(--text-muted)' }}>
                      No transactions found.
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
