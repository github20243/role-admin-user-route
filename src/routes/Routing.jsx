import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import User from '../pages/User';
import ProtectedRouter from './lib/ProtectedRouter';
import AdminRoutes from './lib/AdminRoutes';
const Routing = () => {
  const authState = useSelector((state) => state.auth || {});
  const { isAuthenticated, role } = authState;

  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/user" /> : <SignUp />}
        />
        
        <Route
          path="/"
          element={
            <ProtectedRouter
              Component={User}
              fallBackPath="/signup"
              isAuth={isAuthenticated}
            />
          }
        />
        
        {role === 'admin' && <Route path="/admin/*" element={<AdminRoutes />} />}
      </Routes>
    </Router>
  );
};

export default Routing;
