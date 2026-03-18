import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow, Alert, Snackbar } from '@mui/material';
import { Box as BoxIcon, CheckCircle, ShieldCheck, AlertTriangle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function Blocks() {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verifyResult, setVerifyResult] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchBlocks();
  }, []);

  const fetchBlocks = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('audit_blocks').select('*').order('id', { ascending: false }).limit(50);
    if (!error && data) {
      setBlocks(data);
    }
    setLoading(false);
  };

  const handleVerify = async () => {
    setVerifying(true);
    setVerifyResult(null);
    try {
      const { data, error } = await supabase.rpc('verify_audit_chain');
      if (error) throw error;
      setVerifyResult(data);
    } catch (err) {
      setToast({ variant: 'error', message: err.message });
    } finally {
      setVerifying(false);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'rgba(255, 255, 255, 0.1)', color: 'var(--primary)' }}>
            <BoxIcon size={24} />
          </Box>
          <Typography variant="h1">Blocks</Typography>
        </Box>
        <Button 
          variant="outlined" 
          onClick={handleVerify} 
          disabled={verifying}
          startIcon={verifying ? null : <ShieldCheck size={18} />}
          sx={{ 
            borderColor: 'var(--muted-surface)', 
            color: 'var(--text-main)',
            bgcolor: 'rgba(255,255,255,0.02)',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.05)', borderColor: 'var(--primary)' }
          }}
        >
          {verifying ? 'Verifying Integrity...' : 'Verify Blockchain'}
        </Button>
      </Box>

      {verifyResult && (
        <Card sx={{ mb: 4, border: '1px solid var(--muted-surface)', bgcolor: 'var(--surface)' }}>
          <CardContent sx={{ p: '24px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
              {verifyResult.every(r => r.valid) ? (
                <CheckCircle size={24} color="var(--success)" />
              ) : (
                <AlertTriangle size={24} color="var(--danger)" />
              )}
              <Typography variant="h2">Chain Integrity Result</Typography>
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {verifyResult.length === 0 
                ? 'No blocks to verify.' 
                : verifyResult.every(r => r.valid)
                  ? `Successfully validated cryptographic hashes for all ${verifyResult.length} blocks in the chain.`
                  : `Chain integrity compromised! Cryptographic validation failed.`}
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {verifyResult.map((res, idx) => (
                <Box
                  key={idx}
                  title={`Block #${res.id} - ${res.valid ? 'Valid Hash' : 'Tampered Data'}`}
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '13px',
                    fontWeight: 600,
                    fontFamily: 'monospace',
                    bgcolor: res.valid ? 'rgba(34, 197, 94, 0.05)' : 'rgba(239, 68, 68, 0.1)',
                    color: res.valid ? 'var(--success)' : 'var(--danger)',
                    border: `1px solid ${res.valid ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.4)'}`,
                    cursor: 'default',
                    transition: 'all 0.2s',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: `0 4px 12px ${res.valid ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.25)'}`,
                    }
                  }}
                >
                  {res.id}
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      )}

      <Card sx={{ width: '100%' }}>
        <CardContent sx={{ p: '24px' }}>
          <Typography variant="h2" gutterBottom>Audit Ledger</Typography>
          <Box sx={{ overflowX: 'auto', mt: 3 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Block ID</TableCell>
                  <TableCell>Block Hash</TableCell>
                  <TableCell>Previous Hash</TableCell>
                  <TableCell align="right">Mined At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {blocks.map(block => (
                  <TableRow key={block.id} hover sx={{ transition: 'background 0.2s', '&:hover': { bgcolor: 'rgba(255,255,255,0.02) !important' } }}>
                    <TableCell sx={{ fontWeight: 600, fontSize: '14px' }}>
                      <Box sx={{ px: 1.5, py: 0.5, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 1.5, display: 'inline-block' }}>
                        #{block.id}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'monospace', color: 'var(--text-main)', fontSize: '13px' }}>
                      {block.block_hash}
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'monospace', color: 'var(--text-muted)', fontSize: '13px' }}>
                      {block.prev_hash || <span style={{ opacity: 0.5 }}>Genesis Block</span>}
                    </TableCell>
                    <TableCell align="right" sx={{ color: 'var(--text-muted)', fontSize: '13px' }}>
                      {new Date(block.created_at).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
                {blocks.length === 0 && !loading && (
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ py: 6, color: 'var(--text-muted)' }}>
                      No blocks found in the active chain.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
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
    </Box>
  );
}
