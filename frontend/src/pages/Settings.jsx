import React from 'react';
import {
  Box, Typography, Card, CardContent,
  Switch, FormControlLabel, Button
} from '@mui/material';

const Settings = () => {
  const [darkMode, setDarkMode] = React.useState(false);
  const [notifications, setNotifications] = React.useState(true);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Settings
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">Preferences</Typography>
          <FormControlLabel
            control={<Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />}
            label="Enable Dark Mode"
          />
          <br />
          <FormControlLabel
            control={<Switch checked={notifications} onChange={() => setNotifications(!notifications)} />}
            label="Enable Notifications"
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6">Account</Typography>
          <Button color="error" variant="outlined">Logout</Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Settings;
