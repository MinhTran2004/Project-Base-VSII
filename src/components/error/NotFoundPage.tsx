import { Box, Typography } from "@mui/material"

const NotFoundPage: React.FC = () =>{
    return(
        <Box textAlign="center" mt={5}>
            <Typography variant="h3" gutterBottom>
                404 - page not found
            </Typography>
            <Typography variant="h5">
                Oops! the page you are looking for does not exist.
            </Typography>
        </Box>
    );
};

export default NotFoundPage;