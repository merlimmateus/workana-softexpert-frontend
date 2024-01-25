import React from "react";
import axios from "axios";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = process.env.REACT_APP_API_URL;

function DeleteProductTypeModal({ open, onClose, productTypeId }) {

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/product-types/${productTypeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Product type deleted successfully");
      onClose();
    } catch (error) {
      console.error("Error deleting product type: ", error);
      toast.error("Error deleting product type");
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Delete Product Type</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this product type?
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">Cancel</Button>
          <Button onClick={handleDelete} color="primary">Delete</Button>
        </DialogActions>
      </Dialog>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </>
  );
}

export default DeleteProductTypeModal;
