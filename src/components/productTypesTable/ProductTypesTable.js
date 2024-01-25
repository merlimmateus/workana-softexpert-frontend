import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  TablePagination,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddProductTypeModal from "./AddProductTypeModal";
import EditProductTypeModal from "./EditProductTypeModal";
import DeleteProductTypeModal from "./DeleteProductTypeModal";

const API_URL = process.env.REACT_APP_API_URL;

function ProductTypesTable() {
  const [productTypes, setProductTypes] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedProductType, setSelectedProductType] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/product-types`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProductTypes(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
      toast.error("Error fetching product types");
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
    fetchData();
  };

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    fetchData();
  };

  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    fetchData();
  };

  const handleMenuClick = (event, productType) => {
    setAnchorEl(event.currentTarget);
    setSelectedProductType(productType);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const filteredProductTypes = productTypes.filter((productType) =>
    productType.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Product Types</h1>
      <div className="col-12 d-flex justify-content-end">
        <Button variant="contained" color="primary" onClick={handleOpenAddModal}>
          + Product Type
        </Button>
      </div>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => setSearch(e.target.value)}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Tax ( % )</TableCell>
              <TableCell>Excluded</TableCell>
              <TableCell>Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProductTypes
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((productType) => (
                <TableRow key={productType.id}>
                  <TableCell>{productType.id}</TableCell>
                  <TableCell>{productType.name}</TableCell>
                  <TableCell>{productType.taxPercentage}</TableCell>
                  <TableCell>{productType.excluded ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    <IconButton onClick={(e) => handleMenuClick(e, productType)}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleCloseMenu}
                    >
                      <MenuItem onClick={handleOpenEditModal}>
                        Edit
                      </MenuItem>
                      <MenuItem onClick={handleOpenDeleteModal}>
                        Delete
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filteredProductTypes.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <AddProductTypeModal open={openAddModal} onClose={handleCloseAddModal} />
      <EditProductTypeModal
        open={openEditModal}
        onClose={handleCloseEditModal}
        productType={selectedProductType}
      />
      <DeleteProductTypeModal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        productTypeId={selectedProductType?.id}
      />
    </div>
  );
}

export default ProductTypesTable;
