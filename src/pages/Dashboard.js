import React from 'react';
import Sidebar from '../components/sidebar/sidebar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

function Dashboard() {
  const userProfile = 3; // 1 (client), 2 (seller), ou 3 (adm)

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar userProfile={userProfile} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <h1>Dashboard Content</h1>
      </Box>
    </Box>
  );
}

export default Dashboard;
