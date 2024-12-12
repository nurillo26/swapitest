import { Navigate, Outlet } from 'react-router-dom';
import { getUserFromLC } from '../utils/getUserFromLC';

const ProtectedRoute = () => {
  return getUserFromLC() ? <Outlet /> : <Navigate to={'/login'} replace />;
};

export default ProtectedRoute;
