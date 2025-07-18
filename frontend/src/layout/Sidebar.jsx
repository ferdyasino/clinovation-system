import React from 'react';
import {
  Divider, Drawer, List, ListItem, ListItemIcon,
  ListItemText, Toolbar
} from '@mui/material';
import { Dashboard, Settings } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
  const navigate = useNavigate();

  const drawerContent = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {[
          { text: 'Dashboard', icon: <Dashboard />, route: '/' },
          { text: 'Settings', icon: <Settings />, route: '/settings' },
        ].map(({ text, icon, route }) => (
          <ListItem button key={text} onClick={() => navigate(route)}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { width: drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { width: drawerWidth },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
