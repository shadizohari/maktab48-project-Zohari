import axios from "axios";
export const ResApi = async (method,url,username,password) => {
    let res = await axios({
        method: method,
        url: url,
        headers: { "content-type": "application/json" },
        data: JSON.stringify({
            username,
            password,
          }),
    }).catch((err) => console.log(err));
    return res;
};


