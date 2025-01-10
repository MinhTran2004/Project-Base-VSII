import axios from "axios";
import { IAccount } from "../types/types";
import { getErrorMessage } from "../utils/http-status-code";

export default class AccountService {
    static postAccount = async (data:IAccount, navigate:any) => {
        try {
            await axios.post('https://petstore.swagger.io/v2/user', data.value);
            localStorage.setItem('account', JSON.stringify(data.value.email));
            navigate('/home');
        } catch (e: any) {
            const messenger = getErrorMessage(e.status.toString(), navigate);
            alert(messenger);
        }
    }
} 