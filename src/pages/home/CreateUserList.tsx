import { Box, Button, Typography } from "@mui/material"
import React, { useRef, useState } from "react";
import PrimaryButton from "../../components/PrimaryButton";
import InputFieldUser from "../../components/InputFieldUser";
import FormCreateUserList, { ListCreateUser } from "../../components/FormCreateUserList";
import axios from 'axios';
import { getErrorMessage } from "../../utils/http-status-code";
import { useNavigate } from "react-router-dom";

const CreateUserList = () => {
    const navigate = useNavigate();
    const [listDataCreatedUser, setListDataCreateUser] = useState<ListCreateUser[]>([]);

    const refFieldUser = useRef({
        refUsername: React.createRef<HTMLInputElement>(),
        refFirstName: React.createRef<HTMLInputElement>(),
        refLastName: React.createRef<HTMLInputElement>(),
        refEmail: React.createRef<HTMLInputElement>(),
        refPassword: React.createRef<HTMLInputElement>(),
        refPhone: React.createRef<HTMLInputElement>(),
    })

    const [formFieldUser, setFormFieldUser] = React.useState({
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
        },
        isStatusButton: true,
    });


    const checkInputData = () => {
        let check = true;

        const formData = { ...formFieldUser.formData };
        const textError = { ...formFieldUser.textError };

        const username = formData.username.toString().trim();
        const firstname = formData.firstName.toString().trim();
        const lastname = formData.lastName.toString().trim();
        const email = formData.email.toString().trim();
        const password = formData.password.toString().trim();
        const phone = formData.phone.toString().trim();

        const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const regexPhone = /^(0[1-9]{1})[0-9]{8}$/;

        if (firstname) {
            textError.errorFirstName = "";
        } else {
            textError.errorFirstName = "Không để trống ô nhập";
            check = false;
        }

        if (lastname) {
            textError.errorLastName = "";
        } else {
            textError.errorLastName = "Không để trống ô nhập";
            check = false;
        }

        if (username) {
            textError.errorUserName = "";
        } else {
            textError.errorUserName = "Không để trống ô nhập";
            check = false;
        }

        if (phone) {
            if (!regexPhone.test(phone)) {
                textError.errorPhone = "Vui lòng nhập đúng định dạng số điện thoại";
                check = false;
            } else {
                textError.errorPhone = "";
            }
        } else {
            textError.errorPhone = "Không để trống ô nhập";
            check = false;
        }

        if (email) {
            if (!regexEmail.test(email)) {
                textError.errorEmail = 'Không đúng định dạnh Email !!!';
                check = false;
            } else {
                textError.errorEmail = '';
            }
        } else {
            textError.errorEmail = 'Không để trống ô nhập';
            check = false;
        }

        if (password) {
            if (password.length < 6 || password.length > 10) {
                textError.errorPassword = "Độ dài ký tự từ 6 > 10";
                check = false;
            } else {
                textError.errorPassword = "";
            }
        } else {
            textError.errorPassword = "Không để trống ô nhập";
            check = false;
        }

        setFormFieldUser(prevState => ({
            ...prevState,
            textError: textError,
        }))

        return check;
    };

    const saveForm = () => {
        if (checkInputData()) {
            setListDataCreateUser((prevState) => [formFieldUser, ...prevState]);
            console.log(listDataCreatedUser);
        }
    }

    const handleChangeValue = (name: string, value: string) => {
        setFormFieldUser(prevState => ({
            ...prevState,
            formData: {
                ...prevState.formData,
                [name]: value
            }
        }));
    };

    const postListDataCreateUser = async () => {
        try {
            await axios.post(`https://petstore.swagger.io/v2/user/createWithList`);
        } catch (e: any) {
            const messenger = getErrorMessage(e.status.toString(), navigate);
            alert(messenger);
        }
    }

    return (
        <Box sx={{
            height: '98vh',
        }}>
            <Box sx={{
                height: '100%',
                display: 'grid',
                gridTemplateColumns: '50% 50%',
                backgroundColor: 'white',
                '@media (max-width:800px)': {
                    gridTemplateColumns: 'auto',
                    height: 'auto'
                },
            }}>
                <Box sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '20px',
                    gap: 3,
                }}>
                    <Typography sx={{
                        fontSize: 25,
                        textAlign: 'center',
                    }}>Thông tin tài khoản</Typography>
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: 'auto auto',
                        columnGap: 2,
                        rowGap: 4,
                    }}>
                        <InputFieldUser
                            title="First Name"
                            name="firstName"
                            value={formFieldUser.formData.firstName}
                            onChange={handleChangeValue}
                            placeholder="Nhập First Name"
                            textError={formFieldUser.textError.errorFirstName}
                            inputRef={refFieldUser.current.refFirstName}
                        />

                        <InputFieldUser
                            title="Last Name"
                            name="lastName"
                            value={formFieldUser.formData.lastName}
                            onChange={handleChangeValue}
                            placeholder="Nhập Last Name"
                            textError={formFieldUser.textError.errorLastName}
                            inputRef={refFieldUser.current.refLastName}
                        />

                        <InputFieldUser
                            title="Username"
                            name="username"
                            value={formFieldUser.formData.username}
                            onChange={handleChangeValue}
                            placeholder="Nhập username"
                            textError={formFieldUser.textError.errorUserName}
                            inputRef={refFieldUser.current.refUsername}
                        />

                        <InputFieldUser
                            title="Phone"
                            name="phone"
                            value={formFieldUser.formData.phone}
                            onChange={handleChangeValue}
                            placeholder="Nhập phone"
                            textError={formFieldUser.textError.errorPhone}
                            inputRef={refFieldUser.current.refPhone}
                        />

                        <InputFieldUser
                            title="Email"
                            name="email"
                            value={formFieldUser.formData.email}
                            onChange={handleChangeValue}
                            placeholder="Nhập email"
                            textError={formFieldUser.textError.errorEmail}
                            inputRef={refFieldUser.current.refEmail}
                        />

                        <InputFieldUser
                            title="Password"
                            name="password"
                            value={formFieldUser.formData.password}
                            onChange={handleChangeValue}
                            placeholder="Nhập password"
                            textError={formFieldUser.textError.errorPassword}
                            inputRef={refFieldUser.current.refPassword}
                        />
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        '@media (max-width:440px)': {
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            justifyContent: 'space-between',
                        },
                    }}>
                        <PrimaryButton
                            label="Lưu dữ liệu"
                            styleButton={{
                                padding: ' 10px 20px ',
                                fontSize: 14,
                            }}
                            onPress={saveForm}
                        />
                    </Box>
                </Box>

                <Box sx={{
                    height: '95%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#fbfbfb',
                    overflowX: 'hidden',
                    padding: 3,
                    gap: 3
                }}>
                    <Typography sx={{
                        fontSize: 25,
                        textAlign: 'center',
                    }}>Danh sách tài khoản</Typography>

                    <Box sx={{
                        width: '100%',
                        height: '85%',
                        overflowY: 'scroll',
                        padding: 1,
                        paddingBottom: 5,
                    }}>
                        <FormCreateUserList
                            listDataCreateUser={listDataCreatedUser}
                            setListDataCreateUser={setListDataCreateUser}
                        />
                    </Box>
                    <Button
                        variant="contained"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        onClick={() => postListDataCreateUser()}
                    >
                        Thêm dữ liệu vào hệ thống
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}
export default CreateUserList;