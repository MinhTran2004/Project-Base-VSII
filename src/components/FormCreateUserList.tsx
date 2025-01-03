import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InputFieldUser from "./InputFieldUser";
import PrimaryButton from "./PrimaryButton";
import DeleteIcon from '@mui/icons-material/Delete';
const FormCreateuserList = () => {
    const [expanded, setExpanded] = React.useState('1');
    const [listCreateUser, setListCreateUser] = useState([{ index: '1' }, { index: '2' }]);
    //  { index: '3' }
    const handleChange = (panel: string) => {
        if (expanded === panel) {
            setExpanded('')
        } else {
            setExpanded(panel);
        }
    };

    const [formData, setFormData] = useState({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        userStatus: "",
    })

    const handleChangeValue = (name: string, value: string) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    return (
        <Box>
            {listCreateUser.map((item: any) => (
                <Accordion
                    key={item.index}
                    expanded={expanded === item.index}
                    onChange={() => handleChange(item.index)}
                    sx={{
                        borderRadius: 2
                    }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography component="span" sx={{ width: '33%', flexShrink: 0, fontWeight: 600 }}>
                            Item {item.index}
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
                                title="First Name"
                                name="firstname"
                                value={formData.firstName}
                                onChange={handleChangeValue}
                                placeholder="Nhập First Name"
                            />

                            <InputFieldUser
                                title="Last Name"
                                name="lastname"
                                value={formData.lastName}
                                onChange={handleChangeValue}
                                placeholder="Nhập Last Name"
                            />

                            <InputFieldUser
                                title="Username"
                                name="username"
                                value={formData.username}
                                onChange={handleChangeValue}
                                placeholder="Nhập username"
                            />

                            <InputFieldUser
                                title="Phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChangeValue}
                                placeholder="Nhập phone"
                            />

                            <InputFieldUser
                                title="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChangeValue}
                                placeholder="Nhập email"
                            />

                            <InputFieldUser
                                title="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChangeValue}
                                placeholder="Nhập password"
                            />
                        </Box>

                        <Box sx={{
                            textAlign: 'end'
                        }}>
                            <PrimaryButton
                                label="Lưu dữ liệu"
                                onPress={() => {
                                    console.log(formData.email);
                                }}
                                styleButton={{
                                    padding: ' 10px 20px '
                                }}
                            />
                        </Box>

                    </AccordionDetails>
                </Accordion>
            ))}

            <Button variant="outlined" startIcon={<DeleteIcon />}>
                Delete
            </Button>

        </Box>
    )
}

export default FormCreateuserList;