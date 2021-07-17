import axios from "axios";
import { toast } from 'react-toastify';

export const BooksApi = async (book, method, url,text) => {
    let x = await axios({
        method: method,
        url: url,
        headers: { "content-type": "application/json" },
        data: JSON.stringify(book),
    }).then(response => toast.success(text))
        .catch((e) => toast.error(".درخواست با خطا مواجه شد"))
    return x;
}



export function deleteBookApi(url, id) {
    axios.delete(url + id)
        .then(response => toast.success(".حذف کالا با موفقیت انجام شد"))
        .catch(error => {
            toast.error(".حذف کالا با خظا مواجه شد");
        });
}


export function putBookApi(url, editId, book, text = ".ویرایش با موفقیت انجام شد") {
    axios.put(url + editId, book)
        .then(response => toast.success(text))
        .catch(error => {
            // toast.error("Edited Failed!");
        });
}