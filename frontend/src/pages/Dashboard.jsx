import React from 'react';
import { Typography, Toolbar, Grid, Button, Box, Stack } from '@mui/material';
import ChartCard from '../components/ChartCard';

// ------------------ Mock Data ------------------
const rawAttendanceData = [
  { month: 'Jan', present: 22, absent: 5 },
  { month: 'Feb', present: 20, absent: 7 },
  { month: 'Mar', present: 23, absent: 4 },
  { month: 'Apr', present: 18, absent: 9 },
];

const presentData = rawAttendanceData.map(({ month, present }) => ({
  name: month,
  employee: present
}));

const absentData = rawAttendanceData.map(({ month, absent }) => ({
  name: month,
  employee: absent
}));

const pieData = [
  { name: 'Present', employee: rawAttendanceData.reduce((sum, r) => sum + r.present, 0) },
  { name: 'Absent', employee: rawAttendanceData.reduce((sum, r) => sum + r.absent, 0) },
];

// ------------------ Mock Actions ------------------
const mockActions = [
  { label: '⏱ Clock In', msg: 'Clocked In' },
  { label: '⏱ Clock Out', msg: 'Clocked Out' },
  { label: '☕ Break 1 In', msg: 'Break 1 Started' },
  { label: '☕ Break 1 Out', msg: 'Break 1 Ended' },
  { label: '🍽 Lunch In', msg: 'Lunch Started' },
  { label: '🍽 Lunch Out', msg: 'Lunch Ended' },
  { label: '☕ Break 2 In', msg: 'Break 2 Started' },
  { label: '☕ Break 2 Out', msg: 'Break 2 Ended' },
  { label: '☕ Break 3 In', msg: 'Break 3 Started' },
  { label: '☕ Break 3 Out', msg: 'Break 3 Ended' },
];

// ------------------ Dashboard ------------------
function Dashboard() {
  const handleAction = (msg) => {
    console.log(msg);
    alert(msg);
  };

  return (
    <>
      <Toolbar />
      <Box px={2} py={2}>
        <Typography variant="h6" gutterBottom>
          Welcome to the Clinovation system. This is your dashboard.
        </Typography>

        {/* Attendance Actions */}
        <Typography variant="subtitle1" mt={4} mb={2}>
          Attendance Actions
        </Typography>
        <Grid container spacing={2}>
          {mockActions.map(({ label, msg }, idx) => (
            <Grid item xs={6} sm={4} md={3} key={idx}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => handleAction(msg)}
              >
                {label}
              </Button>
            </Grid>
          ))}
        </Grid>

        {/* Charts */}
        <Stack spacing={3} mt={4}>
          <ChartCard title="Monthly Present (Line)" type="line" data={presentData} />
          <ChartCard title="Monthly Absent (Bar)" type="bar" data={absentData} />
          <ChartCard title="Attendance Summary (Pie)" type="pie" data={pieData} />
        </Stack>
      </Box>
    </>
  );
}

export default Dashboard;
