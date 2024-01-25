import React, { useState } from "react";
import axios from "axios";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = process.env.REACT_APP_API_URL;

function AddProductTypeModal({ open, onClose }) {
  const [name, setName] = useState("");
  const [taxPercentage, setTaxPercentage] = useState("");

  const handleAdd = async () => {
    try {
      const token = localStorage.getItem("token");
      const createdByUserId = JSON.parse(localStorage.getItem("user")).id;

      await axios.post(
        `${API_URL}/product-types`,
        { name, taxPercentage, createdByUserId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Product type added successfully");
      onClose();
    } catch (error) {
      console.error("Error adding product type: ", error);
      toast.error("Error adding product type");
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add Product Type</DialogTitle>
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
            label="Tax Percentage"
            type="number"
            fullWidth
            value={taxPercentage}
            onChange={(e) => setTaxPercentage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">Cancelar</Button>
          <Button onClick={handleAdd} color="primary">Adicionar</Button>
        </DialogActions>
      </Dialog>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </>
  );
}

export default AddProductTypeModal;
