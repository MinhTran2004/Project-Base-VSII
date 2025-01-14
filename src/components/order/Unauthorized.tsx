// components/Unauthorized.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { RootState } from '../../store/store';

const Unauthorized: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  return (
    <>
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center" 
        minHeight="calc(100vh - 64px)" 
        pt={10} 
        pl={6} 
        bgcolor="background.paper" 
        color="text.primary"
      >
        <img src="/assets/403.png" alt="Unauthorized" />
        <Typography variant="h4" color="error" fontWeight="bold">
          OOPS!
        </Typography>
        <Typography variant="h6">
          It seems like you do not have permission to complete this action.
        </Typography>
        <Typography variant="h6">
          Please contact a system admin if you need additional permissions.
        </Typography>
      </Box>
    </>
  );
};

export default Unauthorized;
