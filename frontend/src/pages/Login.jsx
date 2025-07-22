import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Alert,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../services/auth.service'; // ✅ use service here

const AuthForm = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleModeChange = (event, newMode) => {
    if (newMode !== null) {
      setMode(newMode);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setName('');
      setErrorMsg('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (mode === 'login') {
      try {
        const data = await login({ email, password }); // ✅ fixed call
        localStorage.setItem('token', data.token);
        navigate('/');
      } catch (err) {
        setErrorMsg(err.response?.data?.message || 'Login failed');
      }
    } else {
      if (!name || !email || !password || !confirmPassword) {
        setErrorMsg('Please fill all fields');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match');
        return;
      }

      try {
        await register({ name, email, password }); // ✅ fixed call
        alert('Registration successful!');
        setMode('login');
      } catch (err) {
        setErrorMsg(err.response?.data?.message || 'Registration failed');
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {mode === 'login' ? 'Login' : 'Register'}
          </Typography>

          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={handleModeChange}
            sx={{ mt: 2 }}
            fullWidth
          >
            <ToggleButton value="login">Login</ToggleButton>
            <ToggleButton value="register">Register</ToggleButton>
          </ToggleButtonGroup>

          {errorMsg && (
            <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
              {errorMsg}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            {mode === 'register' && (
              <TextField
                margin="normal"
                required
                fullWidth
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {mode === 'register' && (
              <TextField
                margin="normal"
                required
                fullWidth
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {mode === 'login' ? 'Sign In' : 'Register'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default AuthForm;
