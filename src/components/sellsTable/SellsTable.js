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
import AddSellModal from "./AddSellModal";
import EditSellModal from "./EditSellModal";
import DeleteSellModal from "./DeleteSellModal";

const API_URL = process.env.REACT_APP_API_URL;

function SellsTable() {
  const [sells, setSells] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSell, setSelectedSell] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    fetchSells();
  }, []);

  const fetchSells = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/sells`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSells(response.data);
    } catch (error) {
      console.error("Error fetching sells: ", error);
    }
  };

  const handleMenuClick = (event, sell) => {
    setAnchorEl(event.currentTarget);
    setSelectedSell(sell);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleAddSell = () => {
    setAddModalOpen(true);
  };

  const handleEditSell = () => {
    setEditModalOpen(true);
    handleCloseMenu();
  };

  const handleDeleteSell = () => {
    setDeleteModalOpen(true);
    handleCloseMenu();
  };

  const handleAddModalClose = () => {
    setAddModalOpen(false);
    fetchSells();
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    fetchSells();
  };

  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
    fetchSells();
  };

  const filteredSells = sells.filter((sell) =>
    sell.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Sells</h1>
      <div class="d-flex col-12 justify-content-end">
        <Button variant="contained" color="primary" onClick={handleAddSell}>
          + Sell
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
              <TableCell>Name</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Product Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total Value</TableCell>
              <TableCell>Total Tax</TableCell>
              <TableCell>Purchase Total</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Excluded</TableCell>
              <TableCell>Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSells
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((sell) => (
                <TableRow key={sell.id}>
                  <TableCell>{sell.name}</TableCell>
                  <TableCell>{sell.productName}</TableCell>
                  <TableCell>{sell.productPrice}</TableCell>
                  <TableCell>{sell.quantity}</TableCell>
                  <TableCell>{sell.totalValue}</TableCell>
                  <TableCell>{parseFloat(sell.totalTax).toFixed(2)}</TableCell>
                  <TableCell>
                    {parseFloat(sell.purchaseTotal).toFixed(2)}
                  </TableCell>
                  <TableCell>{sell.createdAt}</TableCell>
                  <TableCell>{sell.excluded ? "Sim" : "Não"}</TableCell>
                  <TableCell>
                    <IconButton onClick={(e) => handleMenuClick(e, sell)}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleCloseMenu}
                    >
                      <MenuItem onClick={() => handleEditSell(sell)}>
                        Edit
                      </MenuItem>
                      <MenuItem onClick={() => handleDeleteSell(sell)}>
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
        count={filteredSells.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) =>
          setRowsPerPage(parseInt(e.target.value, 10))
        }
      />
      <AddSellModal open={addModalOpen} onClose={handleAddModalClose} />
      <EditSellModal
        open={editModalOpen}
        onClose={handleEditModalClose}
        sell={selectedSell}
      />
      <DeleteSellModal
        open={deleteModalOpen}
        onClose={handleDeleteModalClose}
        sellId={selectedSell?.id}
      />
    </div>
  );
}

export default SellsTable;
