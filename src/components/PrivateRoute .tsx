import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const role = localStorage.getItem('role'); // Lấy role từ localStorage

  if (role !== 'admin') {
    return <Navigate to="/error" replace />; // Chuyển hướng nếu không phải admin
  }

  return <Outlet />; // Nếu là admin, cho phép truy cập vào trang con
};

export default PrivateRoute;