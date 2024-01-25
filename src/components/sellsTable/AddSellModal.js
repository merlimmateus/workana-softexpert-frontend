import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const API_URL = process.env.REACT_APP_API_URL;

function AddSellModal({ open, onClose }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [productId, setProductId] = useState('');

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
      const createdByUserId = user ? user.id : null;

      await axios.post(`${API_URL}/sells`, {
        name,
        quantity,
        productId,
        createdByUserId
      }, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      toast.success('Sell added successfully');
      onClose();
    } catch (error) {
      console.error('Error adding sell: ', error);
      toast.error('Error adding sell');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Sell</DialogTitle>
      <DialogContent>
        <TextField autoFocus margin="dense" label="Name" type="text" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
        <TextField margin="dense" label="Quantity" type="number" fullWidth value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        <TextField margin="dense" label="Product ID" type="number" fullWidth value={productId} onChange={(e) => setProductId(e.target.value)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancel</Button>
        <Button onClick={handleSave} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddSellModal;
