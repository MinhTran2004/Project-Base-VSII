import axios from "axios";
import { getErrorMessage } from "../utils/http-status-code";

export default class UserService {
    static postUserList = async (data: any, navigate:any) => {
        try {
            const reponse = await axios.post(`https://petstore.swagger.io/v2/user/createWithList`, data);
            if (reponse.status === 200) {
                return true;
            }
        } catch (e: any) {
            const messenger = getErrorMessage(e.status.toString(), navigate);
            alert(messenger);
        }
    }
}