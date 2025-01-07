import React from "react";
import { Grid, Typography, Paper } from "@mui/material";

interface Order {
    id: number;
    petId: number;
    quantity: number;
    shipDate: string;
    status: string;
    complete: boolean;
}

interface OrderDetailsProps {
    order: Order;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
    return (
        <Paper
            elevation={3}
            sx={{
                mt: 2,
                p: 2,
                backgroundColor: "#FFEBEE",
                border: "1px solid #F44336",
            }}
        >
            <Typography variant="h5" gutterBottom>
                Chi tiết đơn hàng
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography variant="subtitle1">ID:</Typography>
                    <Typography>{order.id}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="subtitle1">Pet ID:</Typography>
                    <Typography>{order.petId}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="subtitle1">Số lượng:</Typography>
                    <Typography>{order.quantity}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="subtitle1">Ngày giao:</Typography>
                    <Typography>{new Date(order.shipDate).toLocaleString()}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="subtitle1">Trạng thái:</Typography>
                    <Typography>{order.status}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="subtitle1">Hoàn thành:</Typography>
                    <Typography>{order.complete ? "Có" : "Không"}</Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default OrderDetails;
