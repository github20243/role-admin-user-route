// src/routes/adminRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminPage from '../../pages/AdminPage';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminPage />} />
    </Routes>
  );
};

export default AdminRoutes;
