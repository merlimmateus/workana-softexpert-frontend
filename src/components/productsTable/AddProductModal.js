import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const API_URL = process.env.REACT_APP_API_URL;

function AddProductModal({ open, onClose }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [productTypeId, setProductTypeId] = useState('');

  const handleAdd = async () => {
    try {
      const token = localStorage.getItem('token');
      const createdByUserId = JSON.parse(localStorage.getItem('user')).id;
      await axios.post(`${API_URL}/products`, {
        name,
        price,
        productTypeId,
        createdByUserId
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      toast.success('Product added successfully');
      onClose();
    } catch (error) {
      console.error('Error adding product: ', error);
      toast.error('Error adding product');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Products</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Price"
          type="number"
          fullWidth
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
        <TextField
          margin="dense"
          label="ID do Tipo de Produto"
          type="number"
          fullWidth
          value={productTypeId}
          onChange={e => setProductTypeId(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleAdd} color="primary">
          Adicionar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddProductModal;
