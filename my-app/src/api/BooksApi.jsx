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



    // axios.delete('https://reqres.in/invalid-url')
    //     .then(response => setStatus('Delete successful'))
    //     .catch(error => {
    //         setErrorMessage(error.message);
    //         console.error('There was an error!', error);
    //     });


// const handleDelete = (taskId) => {
//     fetch(`http://localhost:5000/tasks/${taskId}`, {
//       method: "DELETE",
//     })
//       .then((res) => {
//         if (res.status === 404) {
//           toast.error("Not defined");
//         }
//         setTasks(tasks.filter((task) => task.id !== taskId));
//       })
//       .catch((err) => {
//         toast.error("request failed!");
//       });
//   };
// BooksApi
// LoginApi