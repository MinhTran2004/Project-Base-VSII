import axios from 'axios';

export const addAllUsers = async (users: any[]) => {
    const response = await axios.post("https://petstore.swagger.io/v2/user/createWithArray", users);

    if (response.status == 200) {
        console.log(users);
    } 

    return response;
};
