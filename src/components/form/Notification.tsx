import React from 'react';
import { Alert, AlertTitle, Box, LinearProgress } from '@mui/material';

interface NotificationProps {
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
}

const Notification: React.FC<NotificationProps> = ({ message, severity }) => {
    return (
        <Box sx={{ mt: 2 , width:'300px', height:'200px'}}>
            <Alert severity={severity}>
                <AlertTitle>{severity.charAt(0).toUpperCase() + severity.slice(1)}</AlertTitle>
                {message}
            </Alert>
            <LinearProgress />
        </Box>
    );
};

export default Notification;
