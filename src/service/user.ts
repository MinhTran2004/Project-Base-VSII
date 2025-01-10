import axios from "axios";
import { getErrorMessage } from "../utils/http-status-code";

export default class UserService {
    static postUserList = async (data: any, navigate: any) => {
        try {
            await axios.post(`https://petstore.swagger.io/v2/user/createWithList`, data);
            return true;
        } catch (e: any) {
            const messenger = getErrorMessage(e.status.toString(), navigate);
            alert(messenger);
        }
    }
}