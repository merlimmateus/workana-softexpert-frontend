import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function Dashboard() {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to the Dashboard!
      </Typography>
    </Container>
  );
}

export default Dashboard;
