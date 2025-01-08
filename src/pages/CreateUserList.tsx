import { Box, Button, Typography } from "@mui/material"
import FormCreateUserList from "../components/FormCreateUserList";
import axios from 'axios';
import React, { useRef, useState } from "react";
import { getErrorMessage } from "../utils/http-status-code";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";
import InputFieldUser from "../components/InputFieldUser";

const CreateUserList = () => {
    const navigate = useNavigate();

    const [expanded, setExpanded] = React.useState('1');
    const [buttonSaveData, setButtonSaveData] = useState(true);
    const refListCreateUser = useRef([{
        refUsername: '',
        refFirstName: '',
        refLastName: '',
        refEmail: '',
        refPassword: '',
        refPhone: '',
    }])
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
                const reponse = await axios.post(`https://petstore.swagger.io/v2/user/createWithList/hihi`, listData);
                console.log(reponse);

            } catch (e: any) {
                alert(e.message);
                getErrorMessage(e.status.toString(), navigate);
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

            <Box>
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: 'auto auto',
                    gap: 2
                }}>
                    <InputFieldUser
                        disabled={false}
                        title="First Name"
                        name="firstName"
                        value={item.formData.firstName}
                        onChange={handleChangeValue}
                        placeholder="Nhập First Name"
                        textError={item.textError.errorFirstName}
                        inputRef={refInput.current.refFirstName}
                        index={item.index}
                    />

                    <InputFieldUser
                        disabled={false}
                        title="Last Name"
                        name="lastName"
                        value={item.formData.lastName}
                        onChange={handleChangeValue}
                        placeholder="Nhập Last Name"
                        textError={item.textError.errorLastName}
                        index={item.index}
                    />

                    <InputFieldUser
                        disabled={false}
                        title="Username"
                        name="username"
                        value={item.formData.username}
                        onChange={handleChangeValue}
                        placeholder="Nhập username"
                        textError={item.textError.errorUserName}
                        index={item.index}
                    />

                    <InputFieldUser
                        disabled={false}
                        title="Phone"
                        name="phone"
                        value={item.formData.phone}
                        onChange={handleChangeValue}
                        placeholder="Nhập phone"
                        textError={item.textError.errorPhone}
                        index={item.index}
                    />

                    <InputFieldUser
                        disabled={false}
                        title="Email"
                        name="email"
                        value={item.formData.email}
                        onChange={handleChangeValue}
                        placeholder="Nhập email"
                        textError={item.textError.errorEmail}
                        index={item.index}
                    />

                    <InputFieldUser
                        disabled={false}
                        title="Password"
                        name="password"
                        value={item.formData.password}
                        onChange={handleChangeValue}
                        placeholder="Nhập password"
                        textError={item.textError.errorPassword}
                        index={item.index}
                    />
                </Box>

                <Box sx={{
                    flex: 1,
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: 'auto auto',
                    textAlign: 'end',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    gap: 1,
                    '@media (max-width:440px)': {
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        justifyContent: 'space-between',
                    },
                }}>
                    <PrimaryButton
                        label="Xóa bảng"
                        disabled={false}
                        onPress={() => {
                        }}
                        styleButton={{
                            padding: ' 10px 30px ',
                        }}
                    />

                    <PrimaryButton
                        label="Lưu dữ liệu"
                        disabled={false}
                        onPress={() => {
                        }}
                        styleButton={{
                            padding: ' 10px 20px '
                        }}
                    />
                </Box>
            </Box>




            {/* <Box sx={{
                height: '75vh',
                backgroundColor: '#f2f2f2',
                margin: 2,
                marginTop: 0,
                padding: '20px 25px 0',
                borderRadius: 5,
                overflowY: 'scroll',
                '@media (max-width:440px)': {
                    margin: 1,
                    padding: '15px 15px 0',
                },
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
                        marginRight: 2,
                        '@media (max-width:440px)': {
                            marginRight: 1,
                        },
                    }}

                    onClick={() => {
                        postListUser();
                    }}
                >
                    Thêm dữ liệu
                </Button>
            </Box> */}

        </Box>
    )
}
export default CreateUserList;