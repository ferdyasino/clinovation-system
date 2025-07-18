import React from 'react';
import { AppBar, IconButton, Toolbar, Typography, Button, Box } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const Topbar = ({ handleDrawerToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoginPage = location.pathname === '/login';

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <Menu />
        </IconButton>

        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
          Clinovation Dashboard
        </Typography>

        {!isLoginPage && (
          <Button color="inherit" onClick={() => navigate('/login')}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
