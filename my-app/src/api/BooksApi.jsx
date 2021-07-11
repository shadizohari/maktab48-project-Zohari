import axios from "axios";
import { toast } from 'react-toastify';

export const BooksApi = async (book, method, url) => {
    let x = await axios({
        method: method,
        url: url,
        headers: { "content-type": "application/json" },
        data: JSON.stringify(book),
    }).catch((e) => toast.error("request failed!"))
    return x;
}



export function deleteBookApi(url, id) {
    axios.delete(url + id)
        .then(response => toast.success("Delete Successfully"))
        .catch(error => {
            toast.error("Delete Failed!");
        });
}


export function putBookApi(url, editId, book) {
    axios.put(url + editId, book)
        .then(response => toast.success("Edited Successfully"))
        .catch(error => {
            toast.error("Edited Failed!");
        });
}