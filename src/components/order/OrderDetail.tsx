import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

export enum Status {
    AVAILABLE = "available",
    PENDING = "pending",
    SOLD = "sold",
}

interface Order {
    id: number;
    petId: number;
    quantity: number;
    shipDate: string;
    status: Status;
    complete: boolean;
}

interface OrderDetailsProps {
    orders: Order[];
    // onDeleteOrder?: (orderId: number) => void; // Make this prop optional
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ orders }) => { // Exclude onDeleteOrder here
    return (
        <Paper elevation={3} sx={{ mt: 2, p: 2 }}>
            <Typography variant="h5" gutterBottom>
                Chi tiết đơn hàng
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Pet ID</TableCell>
                            <TableCell>Số lượng</TableCell>
                            <TableCell>Ngày giao</TableCell>
                            <TableCell>Trạng thái</TableCell>
                            <TableCell>Hoàn thành</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{order.petId}</TableCell>
                                <TableCell>{order.quantity}</TableCell>
                                <TableCell>{new Date(order.shipDate).toLocaleString()}</TableCell>
                                <TableCell>{order.status}</TableCell>
                                <TableCell>{order.complete ? "Có" : "Không"}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default OrderDetails;
