import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, CircularProgress, TextField, Container, Box, Alert, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { placeOrderThunk, deleteOrderThunk } from '../store/services/order.services';
import OrderDetails from '../components/OrderDetail';
import MuiCheckbox from '../components/CheckBox'; // Custom checkbox component
import MuiDatePicker from '../components/MuiDatePicker'; // Custom date picker component
import { IOrder, Status } from '../types/types';
import dayjs, { Dayjs } from 'dayjs';
import useResize from '../hooks/useResize';

const PlaceOrder: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const size = useResize(); // Using the useResize hook
    const [order, setOrder] = useState<IOrder>({
        id: Date.now() % 10, // Ensuring id is below 10 by using modulo operator
        petId: 0,
        quantity: 0,
        shipDate: "",
        status: Status.AVAILABLE,
        complete: false
    });
    const [dateValue, setDateValue] = useState<Dayjs | null>(dayjs(null));
    const [orders, setOrders] = useState<IOrder[]>(() => {
        // Load orders from local storage on initial render
        const savedOrders = localStorage.getItem('orders');
        return savedOrders ? JSON.parse(savedOrders) : [];
    });
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState<{ message: string; severity: 'success' | 'error' | 'warning' | 'info' } | null>(null);

    const token = useSelector((state: RootState) => state.auth.token);

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                setNotification(null);
            }, 3000); // Notification disappears after 3 seconds

            return () => clearTimeout(timer);
        }
    }, [notification]);

    useEffect(() => {
        // Save orders to local storage whenever orders change
        localStorage.setItem('orders', JSON.stringify(orders));
    }, [orders]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === "checkbox") {
            const { checked } = e.target as HTMLInputElement; // Type guard for checkbox
            setOrder({
                ...order,
                [name]: checked
            });
        } else {
            setOrder({
                ...order,
                [name]: value
            });
        }
    };

    const handleSelectChange = (event: SelectChangeEvent<Status>) => {
        const { name, value } = event.target;
        setOrder({
            ...order,
            [name]: value as Status
        });
    };

    const handleDateChange = (date: Dayjs | null) => {
        setDateValue(date);
        setOrder({
            ...order,
            shipDate: date ? date.format('YYYY-MM-DD') : ""
        });
    };

    const validateForm = () => {
        const { petId, quantity, shipDate, status, id } = order;
        if (petId === 0 || quantity === 0 || !shipDate || !status || id >= 10) {
            setNotification({ message: "All fields are required and Order ID must be less than 10", severity: "error" });
            return false;
        }
        return true;
    };

    const logActivity = (message: string) => {
        console.log(`User Activity: ${message}`);
        const activityLog = localStorage.getItem('activityLog') ? JSON.parse(localStorage.getItem('activityLog') as string) : [];
        activityLog.push({ message, timestamp: new Date().toISOString() });
        localStorage.setItem('activityLog', JSON.stringify(activityLog));
    };

    const handleDeleteOrder = (orderId: number) => {
        setLoading(true);
        // Dispatch the delete order thunk
        dispatch(deleteOrderThunk(orderId))
            .unwrap()
            .then(() => {
                const updatedOrders = orders.filter(order => order.id !== orderId);
                setOrders(updatedOrders);
                setLoading(false);
                setNotification({ message: "Order deleted successfully", severity: "success" });
            })
            .catch((err) => {
                setLoading(false);
                setNotification({ message: `Failed to delete order: ${err}`, severity: "error" });
            });
    };

    const handleSubmit = () => {
        if (!validateForm()) {
            return;
        }

        if (!token) {
            setNotification({ message: "You need to be logged in to place an order", severity: "error" });
            return;
        }

        setLoading(true);
        // Simulate a delay to showcase the loading state
        setTimeout(() => {
            console.log("Order placed:", order);
            logActivity("User clicked save and placed an order");

            // Call API to place order
            dispatch(placeOrderThunk(order))
                .unwrap()
                .then((res) => {
                    console.log('Order successfully placed', res);
                    setOrders((prevOrders) => [...prevOrders, res]);
                    setLoading(false);
                    setNotification({ message: "Order placed successfully", severity: "success" });
                    // Reset the form
                    setOrder({
                        id: Date.now() % 10, // Ensuring id is below 10 for the next order
                        petId: 0,
                        quantity: 0,
                        shipDate: "",
                        status: Status.AVAILABLE,
                        complete: false
                    });
                    setDateValue(null); // Reset date picker
                })
                .catch((err) => {
                    setLoading(false);
                    if (err.status === 400) {
                        setNotification({ message: "Bad Request - Invalid data", severity: "error" });
                    } else if (err.status === 401) {
                        setNotification({ message: "Unauthorized - Please log in", severity: "error" });
                    } else if (err.status === 404) {
                        setNotification({ message: "Not Found - Resource not available", severity: "error" });
                    } else if (err.status === 500) {
                        setNotification({ message: "Server Error - Please try again later", severity: "error" });
                    } else {
                        setNotification({ message: `Error ${err.status} - ${err.message}`, severity: "error" });
                    }
                });
        }, 2000); // 2 seconds delay to simulate loading
    };

    return (
        <Container maxWidth="md">
            <Box mt={4} p={2} boxShadow={3}>
                <Typography variant="h5" gutterBottom>
                    Đặt đơn hàng mới
                </Typography>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                label="Pet ID"
                                name="petId"
                                value={order.petId}
                                onChange={handleInputChange}
                                fullWidth
                                required
                                margin="normal"
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Số lượng"
                                name="quantity"
                                value={order.quantity}
                                onChange={handleInputChange}
                                fullWidth
                                required
                                margin="normal"
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth margin="normal" size="small">
                                <InputLabel>Trạng thái</InputLabel>
                                <Select
                                    name="status"
                                    value={order.status}
                                    onChange={handleSelectChange}
                                    label="Trạng thái"
                                >
                                    <MenuItem value={Status.AVAILABLE}>{Status.AVAILABLE}</MenuItem>
                                    <MenuItem value={Status.PENDING}>{Status.PENDING}</MenuItem>
                                    <MenuItem value={Status.SOLD}>{Status.SOLD}</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <MuiDatePicker
                                label="Ngày giao"
                                value={dateValue}
                                onChange={handleDateChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <MuiCheckbox
                                label="Hoàn thành"
                                name="complete"
                                checked={order.complete}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Box mt={2} textAlign="center">
                                <Button variant="contained" type="submit" disabled={loading}>
                                    {loading ? <CircularProgress size={24} /> : "Đặt hàng"}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
                {orders.length > 0 && <OrderDetails orders={orders} onDeleteOrder={handleDeleteOrder} />}
                {notification && (
                    <Box mt={2}>
                        <Alert severity={notification.severity}>{notification.message}</Alert>
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default PlaceOrder;
