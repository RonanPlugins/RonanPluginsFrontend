import { Navigate, Outlet } from 'react-router-dom';
import auth from '../../utils/auth';

export default function AuthGuard() {
  const loggedIn = auth.loggedIn();
  if (!loggedIn) return <Navigate to="/login" replace />;
  return <Outlet />;
}
