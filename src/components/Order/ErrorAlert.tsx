import React from "react";
import { Alert } from "@mui/material";

interface ErrorAlertProps {
    message: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => {
    return <Alert severity="error" sx={{ mt: 2 }}>{message}</Alert>;
};

export default ErrorAlert;
