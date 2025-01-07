import React, { useEffect, useState } from "react";
import { Container, Box, CircularProgress } from "@mui/material";
import axios from "axios";
import SearchBar from "../components/Order/SearchBar";
import OrderDetails from "../components/Order/OrderDetails";
import ErrorAlert from "../components/Order/ErrorAlert";
import PageTitle from "../components/Order/PageTitle";
import { getOrderById } from "../services/api";

const FindOrderById: React.FC = () => {
    const [orderId, setOrderId] = useState<string>("");
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [errorSearch, setErrorSearch] = useState<string | null>(null);

    useEffect(() => {
        //fetch acc
    }, [])

    const handleChange = (value: string) => {
        setOrderId(value);

        if (value && !isNaN(Number(value))) {
            setErrorSearch(null);
        }
    };

    const handleSearch = async (id: string) => {
        setLoading(true);
        setError(null);
        setOrder(null);

        if (!id || isNaN(Number(id))) {
            setErrorSearch("Yêu cầu bạn nhập đúng định dạng.");
            setLoading(false)
            return;
        }

        setErrorSearch(null);

        try {
            const response = await getOrderById(id);
            console.log(response)
            setOrder(response);
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
        <Container
            maxWidth="sm"
            sx={{
                mt: 4,
                p: 2,
                minHeight: "100vh",
            }}
        >
            <PageTitle title="Tìm kiếm đơn hàng" />

            <SearchBar
                value={orderId}
                onChange={handleChange}
                onSearch={() => handleSearch(orderId)}
                isLoading={loading}
                error={errorSearch}
            />

            {loading && <CircularProgress sx={{ mt: 2 }} />}

            {error && <ErrorAlert message={error} />}

            {order && <OrderDetails order={order} />}
        </Container>
    );
};

export default FindOrderById;


