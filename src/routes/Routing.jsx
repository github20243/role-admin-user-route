import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import User from '../pages/User';
import AdminRoutes from '../routes/lib/AdminRoutes';
import ProtectedRouter from '../routes/lib/ProtectedRouter';

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
        
        {/* Добавляем новый маршрут для /user */}
        <Route
          path="/user"
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