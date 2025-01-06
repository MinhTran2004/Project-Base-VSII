import React, { useState, useEffect } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { placeOrderThunk } from '../store/services/order.services';
import OrderDetails from '../components/OrderDetail';
import MuiTextField from '../components/MuiTextField';
import MuiCheckbox from '../components/CheckBox';
import SingleLoadingButton from '../components/MuiLoadingButton';
import Notification from '../components/Notification';
import MuiDatePicker from '../components/MuiDatePicker';
import { IOrder, Status } from '../types/types';
import dayjs, { Dayjs } from 'dayjs';
import useResize from '../hooks/useResize';

const PlaceOrder: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const size = useResize(); // Using the useResize hook
    const [order, setOrder] = useState<IOrder>({
        id: 0,
        petId: 0,
        quantity: 0,
        shipDate: "",
        status: Status.AVAILABLE,
        complete: false
    });
    const [dateValue, setDateValue] = useState<Dayjs | null>(dayjs(null));
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState<{ message: string; severity: 'success' | 'error' | 'warning' | 'info' } | null>(null);

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                setNotification(null);
            }, 3000); // Notification disappears after 3 seconds

            return () => clearTimeout(timer);
        }
    }, [notification]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

    const handleDateChange = (date: Dayjs | null) => {
        setDateValue(date);
        setOrder({
            ...order,
            shipDate: date ? date.format('YYYY-MM-DD') : ""
        });
    };

    const validateForm = () => {
        const { id, petId, quantity, shipDate, status } = order;
        if (id === 0 || petId === 0 || quantity === 0 || !shipDate || !status) {
            setNotification({ message: "All fields are required", severity: "error" });
            return false;
        }
        return true;
    };

    const handleSubmit = () => {
        if (!validateForm()) {
            return;
        }
        setLoading(true);
        // Simulate a delay to showcase the loading state
        setTimeout(() => {
            console.log("Order placed:", order);
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
                        id: 0,
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
        <div>
            <Paper elevation={3} sx={{ mt: 2, p: 2 }}>
                <Typography variant="h5" gutterBottom>
                    Đặt đơn hàng mới
                </Typography>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <MuiTextField
                                label="ID"
                                name="id"
                                value={order.id}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <MuiTextField
                                label="Pet ID"
                                name="petId"
                                value={order.petId}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <MuiTextField
                                label="Số lượng"
                                name="quantity"
                                value={order.quantity}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                       
                        <Grid item xs={6}>
                            <MuiTextField
                                label="Trạng thái"
                                name="status"
                                value={order.status}
                                onChange={handleChange}
                                select
                                options={[Status.AVAILABLE, Status.PENDING, Status.SOLD]}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <MuiDatePicker
                                label="Ngày giao"
                                value={dateValue}
                                onChange={handleDateChange}
                                style={{ width: '500px' }} // Change width of the date picker
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <MuiCheckbox
                                label="Hoàn thành"
                                name="complete"
                                checked={order.complete}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <SingleLoadingButton loading={loading} onClick={handleSubmit} />
                        </Grid>
                    </Grid>
                </form>
            </Paper>
            {orders.length > 0 && <OrderDetails orders={orders} />}
            {notification && <Notification message={notification.message} severity={notification.severity} />}
        </div>
    );
};

export default PlaceOrder;
