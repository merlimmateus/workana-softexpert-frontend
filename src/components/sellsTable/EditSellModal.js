import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

const API_URL = process.env.REACT_APP_API_URL;

function EditSellModal({ open, onClose, sell }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [productId, setProductId] = useState("");

  useEffect(() => {
    if (sell) {
      setName(sell.name);
      setQuantity(sell.quantity);
      setProductId(sell.productId);
    }
  }, [sell]);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_URL}/sells/${sell.id}`,
        {
          name,
          quantity,
          productId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success('Sell updated successfully');
      onClose();
    } catch (error) {
      console.error("Error updating sell: ", error);
      toast.error('Error updating sell');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Sell</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Quantity"
          type="number"
          fullWidth
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Product ID"
          type="number"
          fullWidth
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleUpdate} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditSellModal;
