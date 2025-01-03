import React from "react";
import { Box, TextField, Button } from "@mui/material";

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    onSearch: () => void;
    isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSearch, isLoading }) => {
    return (
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <TextField
                label="Nhập ID đơn hàng"
                variant="outlined"
                fullWidth
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={isLoading}
            />
            <Button
                variant="contained"
                onClick={onSearch}
                disabled={isLoading || !value}
                sx={{ textTransform: "uppercase" }}
            >
                Tìm kiếm
            </Button>
        </Box>
    );
};

export default SearchBar;
