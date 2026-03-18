import React, { useState } from 'react';
import { Box, Card, CardHeader, CardContent, Typography, TextField, Button, Stack, Alert } from '@mui/material';
import { ShieldAlert, Download } from 'lucide-react';

export function Settings() {
  const [supabaseUrl] = useState(import.meta.env.VITE_SUPABASE_URL || '');
  // DO NOT SHOW SERVICE ROLE KEY ON CLIENT. This is just for demo visualization.
  const [serviceRoleKey] = useState('••••••••••••••••••••••••••••••••••••••••');

  const handleAnchorExport = () => {
    // Usually this fetches the latest block hash and persists it safely
    alert("In a real app, this generates a timestamped file signature of the latest root and saves it to external storage.");
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h1" gutterBottom>Settings & Admin</Typography>
      
      <Stack spacing={4} sx={{ mt: 4 }}>
        <Card>
          <CardHeader 
            title="Supabase Keys" 
            titleTypographyProps={{ variant: 'h2' }} 
            action={<ShieldAlert size={24} color="var(--accent)" />}
          />
          <CardContent>
            <Alert severity="info" sx={{ mb: 3 }}>
              Service Role key must only be stored on server. Use client-only ANON for reads.
            </Alert>
            <Stack spacing={3}>
              <TextField 
                label="SUPABASE_URL" 
                value={supabaseUrl} 
                InputProps={{ readOnly: true }} 
                fullWidth 
                variant="outlined" 
              />
              <TextField 
                label="SUPABASE_SERVICE_ROLE_KEY" 
                value={serviceRoleKey} 
                InputProps={{ readOnly: true }} 
                fullWidth 
                variant="outlined" 
                helperText="(server only)"
              />
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Export / Anchor" titleTypographyProps={{ variant: 'h2' }} />
          <CardContent>
            <Typography variant="body2" sx={{ color: 'var(--accent)', mb: 3 }}>
              Anchor the latest hash to an external persistent storage to prove chain state existed at this time.
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<Download size={18} />} 
              onClick={handleAnchorExport}
            >
              Anchor Latest Hash (Export)
            </Button>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}
