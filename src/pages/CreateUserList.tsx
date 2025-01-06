import { Box, Button, Typography } from "@mui/material"
import FormCreateUserList from "../components/FormCreateUserList";
import axios from 'axios';
import React, { useState } from "react";

const CreateUserList = () => {
    const [expanded, setExpanded] = React.useState('1');
    const [buttonSaveData, setButtonSaveData] = useState(true);
    const [listCreateUser, setListCreateUser] = React.useState([{
        index: '1',
        formData: {
            username: "asd",
            firstName: "asd",
            lastName: "asd",
            email: "tranminh209204@gmail.com",
            password: "123456",
            phone: "0987654321",
            userStatus: 0,
        },
        textError: {
            errorUserName: '',
            errorFirstName: '',
            errorLastName: '',
            errorEmail: '',
            errorPassword: '',
            errorPhone: '',
        }
    }]);

    const postListUser = async () => {
        const checkListUser = listCreateUser.every((item) => {
            const formData = item.formData;
            return Object.values(formData).every(value =>
                value !== null && value !== undefined && value !== ""
            );
        });

        if (checkListUser) {
            const listData = listCreateUser.map((item) => {
                return item.formData;
            });

            try {
                const reponse = await axios.post(`https://petstore.swagger.io/v2/user/createWithList/hihihi`, listData);
                console.log(reponse);
            } catch (e) {
                console.log(e);
            }
        }

    }

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
                height: '78vh',
                backgroundColor: '#f2f2f2',
                margin: 2,
                padding: '20px 25px 0',
                borderRadius: 5,
                overflowX: 'scroll',
            }}>
                <FormCreateUserList
                    expanded={expanded}
                    listCreateUser={listCreateUser}
                    setExpanded={setExpanded}
                    setListCreateUser={setListCreateUser}
                    setButtonSaveData={setButtonSaveData}
                    buttonSaveData={buttonSaveData}
                />
            </Box>

            <Box sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
            }}>
                <Button
                    disabled={buttonSaveData}
                    variant="contained"
                    sx={{
                        marginRight: 2
                    }}
                    onClick={() => {
                        postListUser();
                    }}
                >
                    Thêm dữ liệu
                </Button>
            </Box>

        </Box>
    )
}
export default CreateUserList;