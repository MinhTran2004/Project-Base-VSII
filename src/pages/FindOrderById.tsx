import React, { useState } from "react";
import { Container, Box, CircularProgress } from "@mui/material";
import axios from "axios";
import SearchBar from "../components/Order/SearchBar";
import OrderDetails from "../components/Order/OrderDetails";
import ErrorAlert from "../components/Order/ErrorAlert";
import PageTitle from "../components/Order/PageTitle";

const FindOrderById: React.FC = () => {
    const [orderId, setOrderId] = useState<string>("");
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async (id: string) => {
        setLoading(true);
        setError(null);
        setOrder(null);

        try {
            const response = await axios.get(`https://petstore.swagger.io/v2/store/order/${id}`);
            setOrder(response.data);
        } catch (err: any) {
            const status = err.response?.status;
            const message = err.response?.data?.message || "Đã xảy ra lỗi.";

            if (status === 400) {
                setError(`Lỗi: ${message} (Order ID phải nhỏ hơn 10).`);
            } else if (status === 404) {
                setError("Không tìm thấy đơn hàng với ID này.");
            } else {
                setError("Đã xảy ra lỗi không mong muốn.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4, p: 2 }}>
            <PageTitle title="Tìm kiếm đơn hàng" />

            <SearchBar
                value={orderId}
                onChange={setOrderId}
                onSearch={() => handleSearch(orderId)}
                isLoading={loading}
            />

            {loading && <CircularProgress sx={{ mt: 2 }} />}

            {error && <ErrorAlert message={error} />}

            {order && <OrderDetails order={order} />}
        </Container>
    );
};

export default FindOrderById;


