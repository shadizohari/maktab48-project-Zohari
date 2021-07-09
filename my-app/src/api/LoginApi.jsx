import axios from "axios";
import { toast } from 'react-toastify';
export const LoginApi = async (method, url, username, password) => {

    let res = await axios({
        method: method,
        url: url,
        headers: { "content-type": "application/json" },
        data: JSON.stringify({
            username,
            password,
        }),
    }).catch((err) => toast.error("request failed!"))
    console.log(res)
    return res;
};


