import { Box, Typography } from "@mui/material";
import ResponsiveAppBar from "../../components/ResponsiveAppBar";
import { useRef, useState } from "react";
import InputFieldUser from "../../components/InputFieldUser";
import banner from '../../assets/images/banner.png';
import PrimaryButton from "../../components/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { IAccount, IRefAccount } from "../../types/types";
import { initAccount, initRefAccount } from "../../types/initTypes";
import AccountService from "../../service/account";

const Login = () => {
    const navigate = useNavigate();
    const [formFieldAccount, setFormFieldAccount] = useState<IAccount>(initAccount);
    const refFieldAccount = useRef<IRefAccount>(initRefAccount);

    const checkInputData = () => {
        const formData = { ...formFieldAccount.value };
        const textError = { ...formFieldAccount.textError };

        const email = formData.email.toString().trim();
        const password = formData.password.toString().trim();

        const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if (email) {
            if (!regexEmail.test(email)) {
                textError.errorEmail = 'Không đúng định dạnh Email !!!';
                setFormFieldAccount(prevState => ({
                    ...prevState,
                    textError: textError,
                }));
                refFieldAccount.current.refUsername.current?.focus();
                return false;
            } else {
                textError.errorEmail = '';
            }
        } else {
            textError.errorEmail = 'Không để trống ô nhập';
            setFormFieldAccount(prevState => ({
                ...prevState,
                textError: textError,
            }));
            refFieldAccount.current.refUsername.current?.focus();
            return false;
        }

        if (password) {
            if (password.length < 6 || password.length > 10) {
                textError.errorPassword = "Độ dài ký tự từ 6 > 10";
                setFormFieldAccount(prevState => ({
                    ...prevState,
                    textError: textError,
                }));
                refFieldAccount.current.refPassword.current?.focus();
                return false;
            } else {
                textError.errorPassword = "";
            }
        } else {
            textError.errorPassword = "Không để trống ô nhập";
            setFormFieldAccount(prevState => ({
                ...prevState,
                textError: textError,
            }));
            refFieldAccount.current.refPassword.current?.focus();
            return false;
        }

        return true;
    };

    const handleChangeValue = (name: string, value: string) => {
        setFormFieldAccount(prevState => ({
            ...prevState,
            value: {
                ...prevState.value,
                [name]: value
            }
        }));
    };

    const postCreateAccount = async () => {
        if (checkInputData()) {
            AccountService.postAccount(formFieldAccount, navigate);
        }
    }

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

                <Typography sx={{ fontWeight: 600, fontSize: 28, color: '#2C2A29', fontFamily: 'Inter' }}>Đăng Nhập</Typography>

                <Box sx={{
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}>

                    <InputFieldUser
                        title="Email"
                        name="email"
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
                    label="Tiếp theo"
                    onPress={() => postCreateAccount()} />

                <Typography
                    sx={{
                        fontFamily: 'Inter',
                        color: '#3F3E3C',
                        fontSize: 14,
                        display: 'flex',
                        gap: '6px',
                        justifyContent: 'center'
                    }}
                >
                    Bạn đã có tài khoản?
                    <a href="/register" style={{ color: '#1A77FF', fontWeight: 600, textDecoration: 'none' }}>Đăng kí</a>
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

export default Login;