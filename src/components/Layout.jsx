import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, IconButton, InputBase, Badge, Stack } from '@mui/material';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, Wallet, ArrowRightLeft, Box as BoxIcon, ShieldAlert, Search, LogOut, Menu, X, User } from 'lucide-react';
import { supabase } from '../lib/supabase';

const drawerWidth = 240;

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <Home size={20} />, path: '/dashboard' },
    { text: 'Wallets', icon: <Wallet size={20} />, path: '/wallets' },
    { text: 'Transactions', icon: <ArrowRightLeft size={20} />, path: '/transactions' },
    { text: 'Blocks', icon: <BoxIcon size={20} />, path: '/blocks' },
    { text: 'Fraud Detection', icon: <ShieldAlert size={20} />, path: '/fraud' },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <img src="/logo.svg" alt="Logo" style={{ height: 32 }} />
      </Box>
      <List sx={{ px: 2, flexGrow: 1 }}>
        {menuItems.map((item) => {
          const active = location.pathname.startsWith(item.path);
          return (
            <ListItem 
              button="true"
              component={Link} 
              to={item.path} 
              key={item.text}
              onClick={() => setMobileOpen(false)}
              sx={{
                borderRadius: 2,
                mb: 1,
                bgcolor: active ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                color: active ? 'var(--primary)' : 'var(--text-muted)',
                '&:hover': {
                  bgcolor: active ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255,255,255,0.05)',
                  color: active ? 'var(--primary)' : 'var(--text-main)',
                }
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ 
                  fontWeight: active ? 600 : 500,
                  fontSize: 14
                }} 
              />
            </ListItem>
          )
        })}
      </List>
      <Box sx={{ p: 2, borderTop: '1px solid var(--muted-surface)' }}>
        <ListItem 
          button="true"
          onClick={handleLogout}
          sx={{ borderRadius: 2, color: 'var(--text-muted)', '&:hover': { color: 'var(--text-main)', bgcolor: 'rgba(255,255,255,0.05)' } }}
        >
          <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}><LogOut size={20} /></ListItemIcon>
          <ListItemText primary="Logout" primaryTypographyProps={{ fontWeight: 500, fontSize: 14 }} />
        </ListItem>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: { md: drawerWidth },
          flexShrink: { md: 0 },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', width: { md: `calc(100% - ${drawerWidth}px)` } }}>
        {/* Header */}
        <Box 
          sx={{ 
            height: 72, 
            px: 4,
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--muted-surface)',
            bgcolor: 'rgba(9, 9, 11, 0.8)',
            backdropFilter: 'blur(12px)',
            position: 'sticky',
            top: 0,
            zIndex: 10
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { md: 'none' } }}
            >
              <Menu />
            </IconButton>
            
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              bgcolor: 'var(--surface)', 
              px: 2, 
              py: 1, 
              borderRadius: 2,
              border: '1px solid var(--muted-surface)',
              width: { xs: '100%', md: 400 }
            }}>
              <Search size={18} color="var(--text-muted)" style={{ marginRight: 8 }} />
              <InputBase 
                placeholder="Search by Transaction Hash / Wallet Address" 
                sx={{ ml: 1, flex: 1, fontSize: 14, color: 'var(--text-main)' }} 
              />
            </Box>
          </Box>
          
          <Stack direction="row" alignItems="center" spacing={2} sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 0.5, bgcolor: 'rgba(34, 197, 94, 0.1)', borderRadius: 4, border: '1px solid rgba(34, 197, 94, 0.2)' }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'var(--success)' }} />
              <Typography variant="caption" sx={{ color: 'var(--success)', fontWeight: 600 }}>Mainnet Active</Typography>
            </Box>
            
            {/* Profile Menu Placeholder */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.05)', cursor: 'pointer', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>
              <User size={20} color="var(--text-main)" />
            </Box>
          </Stack>
        </Box>

        {/* Content */}
        <Box sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, bgcolor: 'var(--bg)' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
