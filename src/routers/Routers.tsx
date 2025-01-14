// routers/Routers.tsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Features from '../pages/feature/Features';
import HomePage from '../pages/HomePage';
import Inbox from '../pages/feature/Inbox/Inbox';
import Login from '../pages/login/Login';
import ErrorPage from '../components/error/ErrorPage';
import NotFoundPage from '../components/error/NotFoundPage';
import { RootState } from '../store/store';
import PlaceOrder from '../pages/order/PlaceOrder';
import LoadingPage from '../components/loading/LoadingPage';
import Unauthorized from '../components/order/Unauthorized';

const Routers: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const location = useLocation();
  const isAuthenticated = useSelector((state: RootState) => state.auth.token !== null);

  useEffect(() => {
    setProgress(50);
    const timeout = setTimeout(() => setProgress(100), 500);
    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <div>
      <LoadingPage progress={progress} setProgress={setProgress} />
      <Routes>
        <Route path="/" element={<Features />} errorElement={<ErrorPage />}>
          <Route path="home" element={<HomePage />} />
          <Route path="inbox" element={<Inbox />} />
          <Route 
            path="place-order" 
            element={isAuthenticated ? <PlaceOrder /> : <Unauthorized />} 
          />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default Routers;
