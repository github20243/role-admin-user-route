import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminPage from '../../pages/AdminPage'; 

const AdminRoute = () => {
  return (
    <Routes>
      <Route index = {true} element={<AdminPage />} /> 
    </Routes>
  );
}

export default AdminRoute;
