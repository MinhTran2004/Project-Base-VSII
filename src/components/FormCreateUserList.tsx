import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InputFieldUser from "./InputFieldUser";
import PrimaryButton from "./PrimaryButton";
import AddIcon from '@mui/icons-material/Add';
import React, { useRef } from "react";

interface ListCreateUser {
    index: string,
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
    }
}

interface RefListCreateUser {
    refUsername: string;
    refFirstName: string;
    refLastName: string;
    refEmail: string;
    refPassword: string;
    refPhone: string;
}

interface Props {
    expanded: string,
    // refListCreateUser: RefListCreateUser[],
    listCreateUser: ListCreateUser[],
    setExpanded: (text: string) => void,
    setListCreateUser: (text: ListCreateUser[]) => void,
    setButtonSaveData: (status: boolean) => void,
    buttonSaveData: boolean,
}

const FormCreateUserList = (props: Props) => {

    const refInput = useRef({
        refUsername: '',
        refFirstName: React.createRef<HTMLInputElement>(),
        refLastName: '',
        refEmail: '',
        refPassword: '',
        refPhone: '',
    })

    const checkNullField = (indexData: number, listData: ListCreateUser) => {
        const updatedList = [...props.listCreateUser];
        updatedList[indexData] = {
            ...updatedList[indexData],
            textError: { ...listData.textError }
        };
        props.setListCreateUser(updatedList);
        refInput.current.refFirstName.current?.focus();
    };

    const checkInputData = (index: string) => {
        let check = true;

        const indexData = props.listCreateUser.findIndex((item) => item.index === index);
        const listData = props.listCreateUser.filter((item) => item.index === index)[0];

        const username = listData.formData.username.toString().trim();
        const firstname = listData.formData.firstName.toString().trim();
        const lastname = listData.formData.lastName.toString().trim();
        const email = listData.formData.email.toString().trim();
        const password = listData.formData.password.toString().trim();
        const phone = listData.formData.phone.toString().trim();

        const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const regexPhone = /^(0[1-9]{1})[0-9]{8}$/;

        if (firstname) {
            listData.textError.errorFirstName = "";
        } else {
            listData.textError.errorFirstName = "Không để trống ô nhập";
            checkNullField(indexData, listData);
            return false;
        }

        if (lastname) {
            listData.textError.errorLastName = "";
        } else {
            listData.textError.errorLastName = "Không để trống ô nhập";
            checkNullField(indexData, listData);
            return false;
        }

        if (username) {
            listData.textError.errorUserName = "";
        } else {
            listData.textError.errorUserName = "Không để trống ô nhập";
            checkNullField(indexData, listData);
            return false;
        }

        if (phone) {
            if (!regexPhone.test(phone)) {
                listData.textError.errorPhone = "Vui lòng nhập đúng định dạng số điện thoại";
                checkNullField(indexData, listData);
                return false;
            } else {
                listData.textError.errorPhone = "";
            }
        } else {
            listData.textError.errorPhone = "Không để trống ô nhập";
            checkNullField(indexData, listData);
            return false;
        }

        if (email) {
            if (!regexEmail.test(email)) {
                listData.textError.errorEmail = 'Không đúng định dạnh Email !!!';
                checkNullField(indexData, listData);
                return false;
            } else {
                listData.textError.errorEmail = '';
            }
        } else {
            listData.textError.errorEmail = 'Không để trống ô nhập';
            checkNullField(indexData, listData);
            return false;
        }

        if (password) {
            if (password.length < 6 || password.length > 10) {
                listData.textError.errorPassword = "Độ dài ký tự từ 6 > 10";
                checkNullField(indexData, listData);
                return false;
            } else {
                listData.textError.errorPassword = "";
            }
        } else {
            listData.textError.errorPassword = "Không để trống ô nhập";
            checkNullField(indexData, listData);
            return false;
        }

        return { check, indexData, listData };
    };

    // luu form
    const saveForm = (index: string) => {
        const result = checkInputData(index);

        if (result !== false) {
            const updatedList = [...props.listCreateUser];
            updatedList[result.indexData] = {
                ...updatedList[result.indexData],
                textError: { ...result.listData.textError }
            };
            props.setListCreateUser(updatedList);
            props.setButtonSaveData(false);
        }
    }

    // them form
    const addForm = () => {
        const index = (Number(props.listCreateUser[props.listCreateUser.length - 1].index) + 1).toString();
        props.setExpanded(index);
        props.setListCreateUser([...props.listCreateUser, {
            index: index,
            formData: {
                username: "minh",
                firstName: "minh",
                lastName: "minh",
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
        }]);
        // props.refListCreateUser = [...props.refListCreateUser, {
        //     refUsername: '',
        //     refFirstName: '',
        //     refLastName: '',
        //     refEmail: '',
        //     refPassword: '',
        //     refPhone: '',
        // }]
        props.setButtonSaveData(true);
    }

    // xoa form
    const deleteForm = (indexDelete: string) => {
        if (props.listCreateUser.length > 1) {
            const indexDataDelete = props.listCreateUser.findIndex((item) => item.index === indexDelete);
            if (indexDataDelete !== -1) {
                const updatedList = [...props.listCreateUser];
                updatedList.splice(indexDataDelete, 1);
                props.setListCreateUser(updatedList);
                props.setButtonSaveData(true);
                props.setExpanded((Number(props.expanded) - 1).toString());
            }
        } else {
            alert('Cần có nhiều hơn 1 form data mới có thể xóa');
        }
    }


    const handleChange = (panel: string) => {
        if (props.expanded === panel) {
            props.setExpanded('')
        } else {
            props.setExpanded(panel);
        }
    };

    const handleChangeValue = (index: string, name: string, value: string) => {
        const updateList = props.listCreateUser.map((item) =>
            item.index === index ?
                { ...item, formData: { ...item.formData, [name]: value } }
                : item
        );
        props.setListCreateUser(updateList);
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1.5,
        }}>
            {props.listCreateUser.map((item: any) => (
                <Accordion
                    key={item.index}
                    disableGutters
                    expanded={props.expanded === item.index}
                    onChange={() => handleChange(item.index)}
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
                            {item.formData.email ?
                                item.formData.email
                                :
                                "Item " + item.index
                            }
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
                            gap: 2
                        }}>
                            <InputFieldUser
                                disabled={Number(item.index) < props.listCreateUser.length}
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
                                disabled={Number(item.index) < props.listCreateUser.length}
                                title="Last Name"
                                name="lastName"
                                value={item.formData.lastName}
                                onChange={handleChangeValue}
                                placeholder="Nhập Last Name"
                                textError={item.textError.errorLastName}
                                index={item.index}
                            />

                            <InputFieldUser
                                disabled={Number(item.index) < props.listCreateUser.length}
                                title="Username"
                                name="username"
                                value={item.formData.username}
                                onChange={handleChangeValue}
                                placeholder="Nhập username"
                                textError={item.textError.errorUserName}
                                index={item.index}
                            />

                            <InputFieldUser
                                disabled={Number(item.index) < props.listCreateUser.length}
                                title="Phone"
                                name="phone"
                                value={item.formData.phone}
                                onChange={handleChangeValue}
                                placeholder="Nhập phone"
                                textError={item.textError.errorPhone}
                                index={item.index}
                            />

                            <InputFieldUser
                                disabled={Number(item.index) < props.listCreateUser.length}
                                title="Email"
                                name="email"
                                value={item.formData.email}
                                onChange={handleChangeValue}
                                placeholder="Nhập email"
                                textError={item.textError.errorEmail}
                                index={item.index}
                            />

                            <InputFieldUser
                                disabled={Number(item.index) < props.listCreateUser.length}
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
                                disabled={Number(props.expanded) !== props.listCreateUser.length}
                                onPress={() => {
                                    deleteForm(item.index);
                                }}
                                styleButton={{
                                    padding: ' 10px 30px ',
                                }}
                            />

                            <PrimaryButton
                                label="Lưu dữ liệu"
                                disabled={Number(props.expanded) !== props.listCreateUser.length}
                                onPress={() => {
                                    saveForm(item.index);
                                }}
                                styleButton={{
                                    padding: ' 10px 20px '
                                }}
                            />
                        </Box>
                    </AccordionDetails>
                </Accordion>
            ))}

            <Button
                variant="contained"
                disabled={props.buttonSaveData}
                startIcon={<AddIcon />}
                onClick={() => addForm()}
            >
                Thêm ô nhập
            </Button>
        </Box>
    )
}

export default FormCreateUserList;