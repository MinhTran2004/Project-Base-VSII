import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InputFieldUser from "./InputFieldUser";
import PrimaryButton from "./PrimaryButton";
import React, { useRef } from "react";

export interface ListCreateUser {
    formData: {
        username: string,
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        phone: string,
        userStatus: number,
    },
    textError: {
        errorUserName: string,
        errorFirstName: string,
        errorLastName: string,
        errorEmail: string,
        errorPassword: string,
        errorPhone: string,
    },
    isStatusButton: boolean,
}

interface Props {
    listDataCreateUser: ListCreateUser[],
    setListDataCreateUser: (text: ListCreateUser[]) => void,
}

const FormCreateUserList = (props: Props) => {
    const [expanded, setExpanded] = React.useState(props.listDataCreateUser.length);
    
    const refInput = useRef({
        refUsername: React.createRef<HTMLInputElement>(),
        refFirstName: React.createRef<HTMLInputElement>(),
        refLastName: React.createRef<HTMLInputElement>(),
        refEmail: React.createRef<HTMLInputElement>(),
        refPassword: React.createRef<HTMLInputElement>(),
        refPhone: React.createRef<HTMLInputElement>(),
    })

    const checkNullField = (index: number, listData: ListCreateUser) => {
        const updatedList = [...props.listDataCreateUser];
        updatedList[index] = {
            ...updatedList[index],
            textError: { ...listData.textError }
        };
        props.setListDataCreateUser(updatedList);
    };

    const checkInputData = (index: number) => {
        const dataUserByIndex = props.listDataCreateUser[index];

        const username = dataUserByIndex.formData.username.toString().trim();
        const firstname = dataUserByIndex.formData.firstName.toString().trim();
        const lastname = dataUserByIndex.formData.lastName.toString().trim();
        const email = dataUserByIndex.formData.email.toString().trim();
        const password = dataUserByIndex.formData.password.toString().trim();
        const phone = dataUserByIndex.formData.phone.toString().trim();

        const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const regexPhone = /^(0[1-9]{1})[0-9]{8}$/;

        if (firstname) {
            dataUserByIndex.textError.errorFirstName = "";
        } else {
            dataUserByIndex.textError.errorFirstName = "Không để trống ô nhập";
            checkNullField(index, dataUserByIndex);
            refInput.current.refFirstName.current?.focus();
            return false;
        }

        if (lastname) {
            dataUserByIndex.textError.errorLastName = "";
        } else {
            dataUserByIndex.textError.errorLastName = "Không để trống ô nhập";
            checkNullField(index, dataUserByIndex);
            refInput.current.refLastName.current?.focus();
            return false;
        }

        if (username) {
            dataUserByIndex.textError.errorUserName = "";
        } else {
            dataUserByIndex.textError.errorUserName = "Không để trống ô nhập";
            checkNullField(index, dataUserByIndex);
            refInput.current.refUsername.current?.focus();
            return false;
        }

        if (phone) {
            if (!regexPhone.test(phone)) {
                dataUserByIndex.textError.errorPhone = "Vui lòng nhập đúng định dạng số điện thoại";
                checkNullField(index, dataUserByIndex);
                refInput.current.refPhone.current?.focus();
                return false;
            } else {
                dataUserByIndex.textError.errorPhone = "";
            }
        } else {
            dataUserByIndex.textError.errorPhone = "Không để trống ô nhập";
            checkNullField(index, dataUserByIndex);
            refInput.current.refPhone.current?.focus();
            return false;
        }

        if (email) {
            if (!regexEmail.test(email)) {
                dataUserByIndex.textError.errorEmail = 'Không đúng định dạnh Email !!!';
                checkNullField(index, dataUserByIndex);
                refInput.current.refEmail.current?.focus();
                return false;
            } else {
                dataUserByIndex.textError.errorEmail = '';
            }
        } else {
            dataUserByIndex.textError.errorEmail = 'Không để trống ô nhập';
            checkNullField(index, dataUserByIndex);
            refInput.current.refEmail.current?.focus();
            return false;
        }

        if (password) {
            if (password.length < 6 || password.length > 10) {
                dataUserByIndex.textError.errorPassword = "Độ dài ký tự từ 6 > 10";
                checkNullField(index, dataUserByIndex);
                refInput.current.refPassword.current?.focus();
                return false;
            } else {
                dataUserByIndex.textError.errorPassword = "";
            }
        } else {
            dataUserByIndex.textError.errorPassword = "Không để trống ô nhập";
            checkNullField(index, dataUserByIndex);
            refInput.current.refPassword.current?.focus();
            return false;
        }

        return { index, dataUserByIndex };
    };

    // luu form
    const updateDataByIndex = (index: number) => {
        const result = checkInputData(index);
        const dataUserByIndex = [...props.listDataCreateUser];

        if (props.listDataCreateUser[index].isStatusButton) {
            const updateDataUser = {
                ...dataUserByIndex[index],
                isStatusButton: false,
            }
            dataUserByIndex[index] = updateDataUser;
            props.setListDataCreateUser(dataUserByIndex);
        } else {
            if (result !== false) {
                const updateDataUser = {
                    ...dataUserByIndex[index],
                    isStatusButton: true,
                }
                dataUserByIndex[index] = updateDataUser;
                props.setListDataCreateUser(dataUserByIndex);
            }
        }
    }

    // xoa form
    const deleteForm = (index: number) => {
        const updateList = [...props.listDataCreateUser];
        updateList.splice(index, 1);
        props.setListDataCreateUser(updateList);
    }

    const handleChangeValue = (name: string, value: string, index: number) => {
        const dataUserByIndex = [...props.listDataCreateUser];
        const updateDataUser = {
            ...dataUserByIndex[index],
            formData: {
                ...dataUserByIndex[index].formData,
                [name]: value
            },
        };
        dataUserByIndex[index] = updateDataUser;
        props.setListDataCreateUser(dataUserByIndex);
    };

    const handleChange = (index: number) => {
        if (props.listDataCreateUser[expanded].isStatusButton) {
            setExpanded(index);
        } else {
            alert('Vui lòng lưu dữ liệu');
        }
    };

    return (
        <Box sx={{
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1.5,
        }}>
            {props.listDataCreateUser.map((item: any, index) => (
                <Accordion
                    key={index}
                    disableGutters
                    expanded={expanded === index}
                    onChange={() => handleChange(index)}
                    sx={{
                        width: '100%',
                        borderRadius: 2,
                        '& .css-s1wtk5': {
                            backgroundColor: 'red',
                            margin: 20
                        }
                    }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography component="span" sx={{ width: '33%', flexShrink: 0, fontWeight: 600 }}>
                            {item.formData.email}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                    }}>

                        <Box sx={{
                            display: 'grid',
                            gridTemplateColumns: 'auto auto',
                            gap: 1.5
                        }}>
                            <InputFieldUser
                                disabled={item.isStatusButton}
                                title="First Name"
                                name="firstName"
                                value={item.formData.firstName}
                                onChange={handleChangeValue}
                                placeholder="Nhập First Name"
                                textError={item.textError.errorFirstName}
                                inputRef={refInput.current.refFirstName}
                                index={index}
                            />

                            <InputFieldUser
                                disabled={item.isStatusButton}
                                title="Last Name"
                                name="lastName"
                                value={item.formData.lastName}
                                onChange={handleChangeValue}
                                placeholder="Nhập Last Name"
                                textError={item.textError.errorLastName}
                                inputRef={refInput.current.refLastName}
                                index={index}
                            />

                            <InputFieldUser
                                disabled={item.isStatusButton}
                                title="Username"
                                name="username"
                                value={item.formData.username}
                                onChange={handleChangeValue}
                                placeholder="Nhập username"
                                textError={item.textError.errorUserName}
                                inputRef={refInput.current.refUsername}
                                index={index}
                            />

                            <InputFieldUser
                                disabled={item.isStatusButton}
                                title="Phone"
                                name="phone"
                                value={item.formData.phone}
                                onChange={handleChangeValue}
                                placeholder="Nhập phone"
                                textError={item.textError.errorPhone}
                                inputRef={refInput.current.refPhone}
                                index={index}
                            />

                            <InputFieldUser
                                disabled={item.isStatusButton}
                                title="Email"
                                name="email"
                                value={item.formData.email}
                                onChange={handleChangeValue}
                                placeholder="Nhập email"
                                textError={item.textError.errorEmail}
                                inputRef={refInput.current.refEmail}
                                index={index}
                            />

                            <InputFieldUser
                                disabled={item.isStatusButton}
                                title="Password"
                                name="password"
                                value={item.formData.password}
                                onChange={handleChangeValue}
                                placeholder="Nhập password"
                                textError={item.textError.errorPassword}
                                inputRef={refInput.current.refPassword}
                                index={index}
                            />
                        </Box>

                        <Box sx={{
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
                                label={!item.isStatusButton ? "Lưu" : "Chỉnh sửa"}
                                styleButton={{
                                    padding: ' 10px 20px ',
                                    fontSize: 12
                                }}
                                onPress={() => {
                                    updateDataByIndex(index);
                                }}
                            />
                            <PrimaryButton
                                label={'Xóa'}
                                styleButton={{
                                    padding: ' 10px 20px ',
                                    fontSize: 12
                                }}
                                onPress={() => deleteForm(index)}
                            />
                        </Box>
                    </AccordionDetails>
                </Accordion>
            ))}


        </Box>
    )
}

export default FormCreateUserList;