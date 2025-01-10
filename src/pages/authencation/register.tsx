import { Box, Typography } from "@mui/material";
import ResponsiveAppBar from "../../components/ResponsiveAppBar";
import { useRef, useState } from "react";
import InputFieldUser from "../../components/InputFieldUser";
import banner from '../../assets/images/banner.png';
import PrimaryButton from "../../components/PrimaryButton";
import { initAccount, initRefAccount } from "../../types/initTypes";
import { IAccount, IRefAccount } from "../../types/types";

const Register = () => {
    const [formFieldAccount, setFormFieldAccount] = useState<IAccount>(initAccount);
    const refFieldAccount = useRef<IRefAccount>(initRefAccount);

    const handleChangeValue = (name: string, value: string) => {
        setFormFieldAccount(prevState => ({
            ...prevState,
            formData: {
                ...prevState.value,
                [name]: value
            }
        }));
    };

    return (
        <Box style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyItems: 'center',
            backgroundColor: 'rgba(255, 201, 0, 0.8)',
        }}>
            <ResponsiveAppBar />

            <img
                src={banner}
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    zIndex: -1,
                    top: 0
                }}
                alt=""
            />

            <Box
                sx={{
                    backgroundColor: 'white',
                    display: 'flex',
                    margin: 'auto',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    padding: '30px',
                    borderRadius: '20px',
                    gap: '30px',
                    boxSizing: 'border-box',
                    width: {
                        xs: '490px',
                        sm: '490px',
                        md: '500px',
                        lg: '500px',
                        xl: '500px',
                    },
                }}>

                <Typography sx={{ fontWeight: 600, fontSize: 28, color: '#2C2A29', fontFamily: 'Inter' }}>Đăng ký</Typography>

                <Box sx={{
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}>

                    <InputFieldUser
                        title="Username"
                        name="username"
                        value={formFieldAccount.value.email}
                        onChange={handleChangeValue}
                        placeholder="Nhập username"
                        textError={formFieldAccount.textError.errorEmail}
                        inputRef={refFieldAccount.current.refUsername}
                    />

                    <InputFieldUser
                        title="Username"
                        name="password"
                        value={formFieldAccount.value.password}
                        onChange={handleChangeValue}
                        placeholder="Nhập password"
                        textError={formFieldAccount.textError.errorPassword}
                        inputRef={refFieldAccount.current.refPassword}
                    />

                    <Typography sx={{ fontFamily: 'Inter', color: '#000000', fontSize: 14 }}>Với việc đăng ký tài khoản, bạn chấp nhận các
                        <Typography component='span' sx={{ color: '#FFA21A', fontWeight: 600 }}> điều khoản </Typography>
                        và
                        <Typography component='span' sx={{ color: '#FFA21A', fontWeight: 600 }}> chính sách </Typography>
                        của chúng tôi.
                    </Typography>
                </Box>

                <PrimaryButton
                    label="Tiếp theo" />


                <Typography sx={{ fontFamily: 'Inter', color: '#3F3E3C', fontSize: 14, display: 'flex', gap: '6px', justifyContent: 'center' }}>
                    Bạn đã có tài khoản?
                    <a href="/" style={{ color: '#1A77FF', fontWeight: 600, textDecoration: 'none' }}>Đăng nhập</a>
                </Typography>
            </Box>

            <Box style={{ backgroundColor: 'white', width: '100%', position: 'absolute', bottom: 0, paddingTop: 4, paddingBottom: 4, boxSizing: 'border-box' }}>
                <p style={{
                    textAlign: 'center',
                    fontSize: 16,
                    fontWeight: 600,
                    color: '#4C4A48'
                }}>© 2024 comacPro. Ltd. All Rights Reserved</p>
            </Box>
        </Box>
    )
}

export default Register;