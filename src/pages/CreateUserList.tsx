import { Box, Button, Typography } from "@mui/material"
import FormCreateuserList from "../components/FormCreateUserList";

const CreateUserList = () => {
    return (
        <Box sx={{
            height: '98vh',
        }}>
            <Typography
                sx={{
                    fontSize: 30,
                    fontWeight: 600,
                    textAlign: 'center',
                    padding: '10px 0',
                }}
            >
                Create List User
            </Typography>

            <Box sx={{
                height: '75vh',
                backgroundColor: '#f2f2f2',
                margin: 2,
                padding: '20px 25px 0',
                borderRadius: 5,
                overflowX: 'scroll'
            }}>
                <FormCreateuserList />
            </Box>

            <Box sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
            }}>
                <Button
                    variant="contained"
                    sx={{
                        marginRight: 2
                    }}
                >
                    Thêm dữ liệu
                </Button>
            </Box>

        </Box>
    )
}
export default CreateUserList;