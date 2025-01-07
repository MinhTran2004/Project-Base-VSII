import React from "react";
import { Box, TextField, Button } from "@mui/material";

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    onSearch: () => void;
    error: string | null;
    isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSearch, error, isLoading }) => {
    return (
        <>
            <Box sx={{
                display: "flex",
                flexWrap: { xs: "wrap", sm: "nowrap" },
                gap: 2,
                mt: 2,
                alignItems: "center",
                justifyContent: { xs: "center", sm: "flex-start" }
            }}>
                <TextField
                    label="Nhập ID đơn hàng"
                    variant="outlined"
                    fullWidth
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    disabled={isLoading}
                    sx={{ flex: "1 1 auto", minWidth: "250px" }}
                />
                <Button
                    variant="contained"
                    onClick={onSearch}
                    disabled={isLoading || !value}
                    sx={{
                        alignItems: { sm: "center" },
                        textTransform: "uppercase",
                        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                        color: "white",
                        fontWeight: "bold",
                        borderRadius: "50px",
                        padding: "10px 20px",
                        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
                        "&:hover": {
                            background: "linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)",
                        },
                        flexShrink: 0,
                    }}
                >
                    Tìm kiếm
                </Button>
            </Box>
            {error && <p style={{
                color: "red",
                fontSize: "14px",
                marginTop: "8px",
                wordWrap: "break-word",
                width: "100%",
                textAlign: "center"
            }}>
                {error}
            </p>}
        </>
    );
};

export default SearchBar;
