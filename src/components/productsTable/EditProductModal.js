import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";

const API_URL = process.env.REACT_APP_API_URL;

function EditProductModal({ open, onClose, product }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [productTypeId, setProductTypeId] = useState("");
  const [productTypes, setProductTypes] = useState([]);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setProductTypeId(product.productTypeId);
    }
    fetchProductTypes();
  }, [product]);

  const fetchProductTypes = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/product-types`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProductTypes(response.data);
    } catch (error) {
      console.error("Error fetching product types: ", error);
      toast.error('Error fetching product types');
    }
  };

  const handleEdit = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_URL}/products`,
        {
          productId: product.id,
          name,
          price,
          productTypeId: productTypeId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('Product updated successfully');
      onClose();
    } catch (error) {
      console.error("Error updating product: ", error);
      toast.error('Error updating product');
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Edit Product</DialogTitle>
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
            label="Price"
            type="number"
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <TextField
            type="number"
            margin="dense"
            label="Product Type"
            fullWidth
            value={productTypeId}
            onChange={(e) => setProductTypeId(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </>
  );
}

export default EditProductModal;
