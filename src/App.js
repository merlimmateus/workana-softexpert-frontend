import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './PrivateRoute';
import Produtos from './pages/Produtos';
import Vendas from './pages/Vendas';
import TiposDeProduto from './pages/TiposProduto';
import GestaoUsuarios from './pages/GestaoUsuarios';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/produtos" element={<PrivateRoute><Produtos /></PrivateRoute>} />
        <Route path="/vendas" element={<PrivateRoute><Vendas /></PrivateRoute>} />
        <Route path="/tipos-produto" element={<PrivateRoute><TiposDeProduto /></PrivateRoute>} />
        <Route path="/gestao-usuarios" element={<PrivateRoute><GestaoUsuarios /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
