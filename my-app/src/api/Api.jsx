import axios from "axios";
import { unstable_renderSubtreeIntoContainer } from "react-dom/cjs/react-dom.development";
import { toast } from 'react-toastify';
export const ApiLogin = async (method, url, username, password) => {

    let res = await axios({
        method: method,
        url: url,
        headers: { "content-type": "application/json" },
        data: JSON.stringify({
            username,
            password,
        }),
    }).catch((err) => toast.error(err))
    return res;
};


// export const ApiBook = async (url) => {
//     let res =await axios.get(url)
//         .then(response => {
//             console.log(response.data);
//         }, error => {
//             console.log(error);
//         });
//     return res;
// }

