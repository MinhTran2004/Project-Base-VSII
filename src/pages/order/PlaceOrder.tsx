import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import OrderDetails from '../../components/order/OrderDetail';
import { Status, IOrder } from '../../types/types';
import MuiCheckbox from '../../components/form/MuiCheckBox';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { checkPetExistsThunk } from '../../store/services/pet.service';
import { createOrderThunk } from '../../store/services/order.service';
import DateTimePickerComponent from '../../components/form/MuiDatePicker';
import './placeOrder.css';

const logActivity = (message: string) => {
  const activityLog = JSON.parse(localStorage.getItem('activityLog') || '[]');
  activityLog.push({ message, timestamp: new Date().toISOString() });
  localStorage.setItem('activityLog', JSON.stringify(activityLog));
};

const PlaceOrder: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token) || localStorage.getItem('sessionId');

  const getNextOrderId = () => {
    const lastOrder = JSON.parse(localStorage.getItem('orders') || '[]').pop() as IOrder | undefined;
    return lastOrder ? lastOrder.id + 1 : 1;
  };

  const [order, setOrder] = useState<IOrder>({
    id: getNextOrderId(),
    petId: 0,
    quantity: 0,
    shipDate: '',
    status: Status.PENDING,
    complete: false,
  });

  const [isPetValid, setIsPetValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<IOrder[]>(() => JSON.parse(localStorage.getItem('orders') || '[]'));
  const [notification, setNotification] = useState<{ message: string; severity: 'success' | 'error' | 'warning' | 'info' } | null>(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const fieldValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    if (name === 'petId') {
      const petId = parseInt(value, 10);
      const petExists = await dispatch(checkPetExistsThunk(petId)).unwrap();
      setIsPetValid(petExists);

      if (!petExists) {
        setNotification({ message: 'Không có pet trong danh sách', severity: 'error' });
        setOrder((prevOrder) => ({ ...prevOrder, [name]: petId }));
        return;
      }
    }

    setOrder((prevOrder) => ({ ...prevOrder, [name]: fieldValue }));
  };

  const handleSelectChange = (event: SelectChangeEvent<Status>) => {
    setOrder((prevOrder) => ({ ...prevOrder, status: event.target.value as Status }));
  };

  const handleDateTimeChange = (newValue: Date | null) => {
    setOrder({ ...order, shipDate: newValue ? newValue.toISOString() : '' });
  };

  const validateForm = () => {
    const { petId, quantity, shipDate, status } = order;
    if (petId <= 0 || quantity <= 0 || !shipDate || !status) {
      setNotification({ message: 'All fields are required', severity: 'error' });
      return false;
    }
    return true;
  };

  const getErrorMessage = (statusCode: number): string => {
    switch (statusCode) {
      case 404:
        return 'Resource not found';
      case 500:
        return 'Internal server error';
      default:
        return 'An error occurred';
    }
  };

  const handleSubmit = async () => {
    if (!validateForm() || !token) {
      setNotification({ message: token ? 'hãy nhập tất cả các trương' : 'bạn cần logg mới thực hiện place order', severity: 'error' });
      return;
    }

    setLoading(true);

    const petExists = await dispatch(checkPetExistsThunk(order.petId)).unwrap();
    if (!petExists) {
      setLoading(false);
      setNotification({ message: 'pet k có trong danh sách', severity: 'error' });
      return;
    }

    setTimeout(() => {
      logActivity('User clicked save and placed an order');
      dispatch(createOrderThunk(order))
        .unwrap()
        .then((res: IOrder) => {
          setOrders((prevOrders) => [...prevOrders, res]);
          setLoading(false);
          setNotification({ message: 'Order placed successfully', severity: 'success' });
          setOrder({
            id: getNextOrderId(),
            petId: 0,
            quantity: 0,
            shipDate: '',
            status: Status.AVAILABLE,
            complete: false,
          });
          setIsPetValid(false);
        })
        .catch((err) => {
          setLoading(false);
          const errorMessage = getErrorMessage(err.statusCode);
          setNotification({ message: errorMessage, severity: 'error' });
        });
    }, 2000);
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
              {!isPetValid && notification?.message === 'Không có pet trong danh sách' && (
                <Box mt={1}>
                  <Alert severity="error">{notification.message}</Alert>
                </Box>
              )}
            </Grid>
            {isPetValid && (
              <>
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
                    type="number"
                  />
                  {notification?.message === 'All fields are required' && (
                    <Box mt={1}>
                      <Alert severity="error">{notification.message}</Alert>
                    </Box>
                  )}
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
                  {notification?.message === 'All fields are required' && (
                    <Box mt={1}>
                      <Alert severity="error">{notification.message}</Alert>
                    </Box>
                  )}
                </Grid>
                <Grid item xs={6}>
                  <DateTimePickerComponent 
                    selectedDateTime={order.shipDate ? new Date(order.shipDate) : null}
                    onChange={handleDateTimeChange}
                    className="custom-date-picker"
                  />
                  {notification?.message === 'All fields are required' && (
                    <Box mt={1}>
                      <Alert severity="error">{notification.message}</Alert>
                    </Box>
                  )}
                </Grid>
                <Grid item xs={6}>
                  <MuiCheckbox
                    label="Hoàn thành"
                    name="complete"
                    checked={order.complete}
                    onChange={handleInputChange}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <Box mt={2} textAlign="center">
                <Button variant="contained" type="submit" disabled={loading}>
                  {loading ? <CircularProgress size={24} /> : "Đặt hàng"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
        {orders.length > 0 && <OrderDetails orders={orders} />}
      </Box>
    </Container>
  );
};

export default PlaceOrder;
