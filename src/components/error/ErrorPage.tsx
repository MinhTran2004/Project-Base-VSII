// pages/ErrorPage.tsx
import React from 'react';
import { Typography, Box } from '@mui/material';

const ErrorPage: React.FC = () => {
  return (
    <Box textAlign="center" mt={5}>
      <Typography variant="h3" gutterBottom>
        An Error Occurred
      </Typography>
      <Typography variant="h5">
        Sorry, something went wrong. Please try again later.
      </Typography>
    </Box>
  );
};

export default ErrorPage;
