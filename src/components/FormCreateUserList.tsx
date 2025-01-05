import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InputFieldUser from "./InputFieldUser";
import PrimaryButton from "./PrimaryButton";
import AddIcon from '@mui/icons-material/Add';

const FormCreateuserList = () => {
    const [expanded, setExpanded] = React.useState('1');
    const [listCreateUser, setListCreateUser] = useState([{
        index: '1',
        formData: {
            username: "",
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            phone: "",
            userStatus: "",
        }
    }]);

    const handleChange = (panel: string) => {
        if (expanded === panel) {
            setExpanded('')
        } else {
            setExpanded(panel);
        }
    };

    const handleChangeValue = (index: string, name: string, value: string) => {
        const updateList = listCreateUser.map((item) =>
            item.index === index ?
                { ...item, formData: { ...item.formData, [name]: value } }
                : item
        );
        setListCreateUser(updateList);
    };

    const addFormUser = () => {
        const index = (listCreateUser.length + 1).toString();
        setExpanded(index);
        setListCreateUser([...listCreateUser, {
            index: index,
            formData: {
                username: "",
                firstname: "",
                lastname: "",
                email: "",
                password: "",
                phone: "",
                userStatus: "",
            }
        }]);
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1.5,
        }}>
            {listCreateUser.map((item: any) => (
                <Accordion
                    key={item.index}
                    expanded={expanded === item.index}
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
                            {item.formData.email && item.index < listCreateUser.length ?
                                item.formData.email
                                :
                                "Item" + item.index
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
                                disabled={Number(item.index) < listCreateUser.length}
                                title="First Name"
                                name="firstname"
                                value={item.formData.firstname}
                                onChange={handleChangeValue}
                                placeholder="Nhập First Name"
                                index={item.index}
                            />

                            <InputFieldUser
                                disabled={Number(item.index) < listCreateUser.length}
                                title="Last Name"
                                name="lastname"
                                value={item.formData.lastname}
                                onChange={handleChangeValue}
                                placeholder="Nhập Last Name"
                                index={item.index}
                            />

                            <InputFieldUser
                                disabled={Number(item.index) < listCreateUser.length}
                                title="Username"
                                name="username"
                                value={item.formData.username}
                                onChange={handleChangeValue}
                                placeholder="Nhập username"
                                index={item.index}
                            />

                            <InputFieldUser
                                disabled={Number(item.index) < listCreateUser.length}
                                title="Phone"
                                name="phone"
                                value={item.formData.phone}
                                onChange={handleChangeValue}
                                placeholder="Nhập phone"
                                index={item.index}
                            />

                            <InputFieldUser
                                disabled={Number(item.index) < listCreateUser.length}
                                title="Email"
                                name="email"
                                value={item.formData.email}
                                onChange={handleChangeValue}
                                placeholder="Nhập email"
                                index={item.index}
                            />

                            <InputFieldUser
                                disabled={Number(item.index) < listCreateUser.length}
                                title="Password"
                                name="password"
                                value={item.formData.password}
                                onChange={handleChangeValue}
                                placeholder="Nhập password"
                                index={item.index}
                            />
                        </Box>

                        <Box sx={{
                            textAlign: 'end'
                        }}>
                            <PrimaryButton
                                label="Lưu dữ liệu"
                                onPress={() => {
                                    console.log(Number(item.index), item.formData.email);
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
                startIcon={<AddIcon />}
                onClick={() => addFormUser()}
            >
                Thêm ô nhập
            </Button>

        </Box>
    )
}

export default FormCreateuserList;