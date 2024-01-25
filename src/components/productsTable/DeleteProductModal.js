import React from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

const API_URL = process.env.REACT_APP_API_URL;

function DeleteProductModal({ open, onClose, productId }) {
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Product deleted successfully');
      onClose();
    } catch (error) {
      console.error("Error deleting product: ", error);
      toast.error('Error deleting product');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Deletar Produto</DialogTitle>
      <DialogContent>
        <Typography>Tem certeza de que deseja deletar este produto?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleDelete} color="primary">
          Deletar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteProductModal;
