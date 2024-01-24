import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/sidebar/sidebar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Products from './Products';
import Sells from './Sells';
import UserManagement from './UserManagement';
import ProductType from './ProductType';

function Dashboard() {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.groupId) {
      setUserProfile(user.groupId);
    }
  }, []);

  if (userProfile === null) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar userProfile={userProfile} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Routes>
          <Route path="products" element={<Products />} />
          <Route path="sells" element={<Sells />} />
          <Route path="product-type" element={<ProductType />} />
          <Route path="user-management" element={<UserManagement />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default Dashboard;
