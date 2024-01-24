import React from 'react';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import userRoles from '../../utils/userRoules/userRoles';

const Sidebar = ({ userProfile }) => {
  const drawerWidth = 240;
  const userType = userRoles[userProfile];

  const items = [
    { label: 'Products', path: '/dashboard/products', roles: ['client', 'seller', 'adm'] },
    { label: 'Sells', path: '/dashboard/sells', roles: ['seller', 'adm', 'client'] },
    { label: 'Product Type', path: '/dashboard/product-type', roles: ['adm', 'seller'] },
    { label: 'User Management', path: '/dashboard/user-management', roles: ['adm'] },
  ];

  const filteredItems = items.filter(item => item.roles.includes(userType));

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <List>
        {filteredItems.map((item, index) => (
          <ListItem button key={index} component={Link} to={item.path}>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
};

export default Sidebar;
