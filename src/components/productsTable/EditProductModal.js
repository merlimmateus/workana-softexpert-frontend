import React, { useState, useEffect } from "react";
import axios from "axios";
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
    }
  };

  const handleEdit = async () => {
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      const createdByUserId = user ? user.id : null;

      await axios.put(
        `${API_URL}/products`,
        {
          productId: product.id,
          name,
          price,
          productTypeId: productTypeId,
          createdByUserId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onClose();
    } catch (error) {
      console.error("Error updating product: ", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Namme"
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
          select
          margin="dense"
          label="Product Type"
          fullWidth
          value={productTypeId}
          onChange={(e) => setProductTypeId(e.target.value)}
        >
          {productTypes.map((type) => (
            <MenuItem key={type.id} value={type.id}>
              {type.name}
            </MenuItem>
          ))}
        </TextField>
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
  );
}

export default EditProductModal;
