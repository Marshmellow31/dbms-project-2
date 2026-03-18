import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Wallets } from './pages/Wallets';
import { Transactions } from './pages/Transactions';
import { Blocks } from './pages/Blocks';
import { FraudDetection } from './pages/FraudDetection';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/wallets" element={<Wallets />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/blocks" element={<Blocks />} />
            <Route path="/fraud" element={<FraudDetection />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
