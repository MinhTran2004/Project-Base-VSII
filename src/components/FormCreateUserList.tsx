import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InputFieldUser from "./InputFieldUser";
import PrimaryButton from "./PrimaryButton";
import AddIcon from '@mui/icons-material/Add';

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
        errorUserName?: string,
        errorFirstName?: string,
        errorLastName?: string,
        errorEmail?: string,
        errorPassword?: string,
        errorPhone?: string,
    }
}

interface Props {
    expanded: string,
    listCreateUser: ListCreateUser[],
    setExpanded: (text: string) => void,
    setListCreateUser: (text: ListCreateUser[]) => void,
    setButtonSaveData: (status: boolean) => void,
    buttonSaveData: boolean
}

const FormCreateUserList = (props: Props) => {
    let check = true;

    const checkInputData = (index: string) => {
        const formData = props.listCreateUser[Number(index) - 1].formData;

        const username = formData.username.toString().trim();
        const firstname = formData.firstName.toString().trim();
        const lastname = formData.lastName.toString().trim();
        const email = formData.email.toString().trim();
        const password = formData.password.toString().trim();
        const phone = formData.phone.toString().trim();

        const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const regexPhone = /^(0[1-9]{1})[0-9]{8}$/;

        if (firstname) {
            formData.errorFirstName = "";
        } else {
            formData.errorFirstName = "Không để trống ô nhập";
            check = false;
        }

        if (lastname) {
            formData.errorLastName = "";
        } else {
            formData.errorLastName = "Không để trống ô nhập";
            check = false;

        }

        if (username) {
            formData.errorUserName = "";
        } else {
            formData.errorUserName = "Không để trống ô nhập";
            check = false;
        }

        if (phone) {
            if (!regexPhone.test(phone)) {
                formData.errorPhone = "Vui lòng nhập đúng định dạng số điện thoại";
                check = false;
            } else {
                formData.errorPhone = "";
            }
        } else {
            formData.errorPhone = "Không để trống ô nhập";
            check = false;
        }

        if (email) {
            if (!regexEmail.test(email)) {
                formData.errorEmail = 'Không đúng định dạnh Email !!!';
                check = false;
            } else {
                formData.errorEmail = '';
            }
        } else {
            formData.errorEmail = 'Không để trống ô nhập';
            check = false;
        }

        if (password) {
            if (password.length < 6 || password.length > 10) {
                formData.errorPassword = "Độ dài ký tự từ 6 > 10";
            } else {
                formData.errorPassword = "";
            }
        } else {
            formData.errorPassword = "Không để trống ô nhập";
            check = false;
        }

        const updatedList = [...props.listCreateUser];
        updatedList[Number(index) - 1] = {
            ...updatedList[Number(index) - 1],
            formData: { ...formData }
        };

        props.setListCreateUser(updatedList);
        return check;
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

    const addFormUser = () => {
        const index = (props.listCreateUser.length + 1).toString();
        props.setExpanded(index);
        props.setListCreateUser([...props.listCreateUser, {
            index: index,
            formData: {
                username: "",
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                phone: "",
                userStatus: 0,
            }
        }]);
        props.setButtonSaveData(true);
    }

    const deleteForm = () => {
        const index = (props.listCreateUser.length - 1).toString();
        props.setExpanded(index);
    }

    // useEffect(() => {
    check = props.listCreateUser.every((item) => {
        const formData = item.formData;
        return Object.values(formData).every(value =>
            value !== null && value !== undefined && value !== ""
        );
    });
    console.log(check);
    // }, [check])

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
                    expanded={props.expanded === item.index}
                    onChange={() => handleChange(item.index)}
                    sx={{
                        width: '100%',
                        borderRadius: 2
                    }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography component="span" sx={{ width: '33%', flexShrink: 0, fontWeight: 600 }}>
                            {item.formData.email && item.index < props.listCreateUser.length ?
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
                                value={item.formData.firstname}
                                onChange={handleChangeValue}
                                placeholder="Nhập First Name"
                                textError={item.formData.errorFirstName}
                                index={item.index}
                            />

                            <InputFieldUser
                                disabled={Number(item.index) < props.listCreateUser.length}
                                title="Last Name"
                                name="lastName"
                                value={item.formData.lastname}
                                onChange={handleChangeValue}
                                placeholder="Nhập Last Name"
                                textError={item.formData.errorLastName}
                                index={item.index}
                            />

                            <InputFieldUser
                                disabled={Number(item.index) < props.listCreateUser.length}
                                title="Username"
                                name="username"
                                value={item.formData.username}
                                onChange={handleChangeValue}
                                placeholder="Nhập username"
                                textError={item.formData.errorUserName}
                                index={item.index}
                            />

                            <InputFieldUser
                                disabled={Number(item.index) < props.listCreateUser.length}
                                title="Phone"
                                name="phone"
                                value={item.formData.phone}
                                onChange={handleChangeValue}
                                placeholder="Nhập phone"
                                textError={item.formData.errorPhone}
                                index={item.index}
                            />

                            <InputFieldUser
                                disabled={Number(item.index) < props.listCreateUser.length}
                                title="Email"
                                name="email"
                                value={item.formData.email}
                                onChange={handleChangeValue}
                                placeholder="Nhập email"
                                textError={item.formData.errorEmail}
                                index={item.index}
                            />

                            <InputFieldUser
                                disabled={Number(item.index) < props.listCreateUser.length}
                                title="Password"
                                name="password"
                                value={item.formData.password}
                                onChange={handleChangeValue}
                                placeholder="Nhập password"
                                textError={item.formData.errorPassword}
                                index={item.index}
                            />
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            textAlign: 'end',
                            justifyContent: 'flex-end',
                            gap: 1,                            
                        }}>
                            <PrimaryButton
                                label="Xóa bảng"
                                disabled={Number(props.expanded) !== props.listCreateUser.length}
                                onPress={() => {
                                    deleteForm();
                                }}
                                styleButton={{
                                    padding: ' 10px 20px '
                                }}
                            />

                            <PrimaryButton
                                label="Lưu dữ liệu"
                                disabled={Number(props.expanded) !== props.listCreateUser.length || !check}
                                onPress={() => {
                                    checkInputData(item.index);
                                    props.setButtonSaveData(false);
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
                onClick={() => addFormUser()}
            >
                Thêm ô nhập
            </Button>
        </Box>
    )
}

export default FormCreateUserList;