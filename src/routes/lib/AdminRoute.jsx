import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminPage from '../../pages/AdminPage'; // Убедитесь, что вы импортировали правильную страницу

const AdminRoute = () => {
  return (
    <Routes>
      <Route index = {true} element={<AdminPage />} /> {/* Главная страница для админа */}
    </Routes>
  );
}

export default AdminRoute;
