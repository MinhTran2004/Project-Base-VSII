import { Box } from "@mui/material"
import { useLocation } from "react-router-dom";

const HttpCodeError = () => {
    const location = useLocation();

    const { imageError } = location.state || {};
    console.log(location);

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '98vh',
        }}>
            <img
                alt=""
                src={imageError}
                style={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                }} />
        </Box>
    )
}

export default HttpCodeError;