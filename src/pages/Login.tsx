import { useEffect } from "react";
import { loginAPI } from "../services/api";
import { useCurrentApp } from "../components/context/app.context";

const LoginPage: React.FC = () => {
    const { setIsAuthenticated } = useCurrentApp();

    useEffect(() => {
        login();
    }, [])

    const login = async () => {
        const res = await loginAPI('pet', '123');
        //@ts-ignore
        if (res && res.code == 200) {
            //@ts-ignore
            const accessToken = res.message.split(":")[1];
            console.log('hr', accessToken)
            localStorage.setItem("access_token", accessToken);
            setIsAuthenticated(true);
        } else {
            alert("Login failed");
            setIsAuthenticated(false);
        }
    }
    return (
        <div>
            <h1>Login Page</h1>
        </div>
    );
};

export default LoginPage;