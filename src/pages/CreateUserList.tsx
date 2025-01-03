import { Box, Typography } from "@mui/material"
import FormCreateuserList from "../components/FormCreateUserList";

const CreateUserList = () => {
    return (
        <Box>
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
                height: '87vh',
                backgroundColor: '#f2f2f2',
                margin: '20px',
                padding: '20px 25px 0',
                borderRadius: 5
            }}>
                <FormCreateuserList />
            </Box>

        </Box>
    )
}
export default CreateUserList;