import React from 'react';
import { Navigate } from "react-router-dom";

const PrivateRouter = ({ Component, fallBackPath, isAuth }) => {
  return isAuth ? <Component /> : <Navigate to={fallBackPath} replace />;
};

export default PrivateRouter;