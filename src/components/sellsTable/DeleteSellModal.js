import React from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const API_URL = process.env.REACT_APP_API_URL;

function DeleteSellModal({ open, onClose, sellId }) {

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/sells/${sellId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Sell deleted successfully');
      onClose();
    } catch (error) {
      console.error("Error deleting sell: ", error);
      toast.error('Error deleting sell');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Sell</DialogTitle>
      <DialogContent>Are you sure you want to delete this sell?</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDelete} color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteSellModal;
