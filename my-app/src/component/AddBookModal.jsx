import react, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { COLORS, MARGIN } from '../styles/constants';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { toast, ToastContainer } from 'react-toastify';
import { BooksApi } from '../api/BooksApi';
import { setLoading } from '../store/actions/isLoading';
import { setBookList } from '../store/actions/bookList';
import { useDispatch, useSelector } from 'react-redux';
import { uniqId } from '../utils/auth';
import axios from "axios";
import { putBookApi } from '../api/BooksApi'
import HeaderModal from './HeaderModal';



const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: COLORS.accentColor,
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: COLORS.accentColor,
        },
    },
})(TextField);

const useStyles = makeStyles((theme) => ({
    accentColor: {
        background: COLORS.accentColor,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    select: {
        '&:before': {
            borderColor: COLORS.accentColor,
        },
        '&:after': {
            borderColor: COLORS.accentColor,
        }
    },
    margin_1: {
        marginTop: MARGIN.margin_1,
        marginBottom: MARGIN.margin_1,
    },
    margin_2: {
        marginBottom: MARGIN.margin_2,
        marginTop: MARGIN.margin_2,
    },
    margin_3: {
        marginBottom: MARGIN.margin_3,
        marginTop: MARGIN.margin_3,
    },
    parentCategory: {

    },

}));

export default function AddBookModal({ editNameBook, editCategory, editSubCategory, buttonName, putorpost, editId, editImg, editDescription, closeModal, price, quantity, ...props }) {
    const classes = useStyles();
    const [bookName, setBookName] = useState("");
    const [category, setCategory] = useState("رمان");
    const [fileData, setFileData] = useState();
    const [description, setDescription] = useState("");
    const [responseNewBook, setResponseNewBook] = useState();
    const dispatch = useDispatch();
    const [selectedFile, setSelectedFile] = useState();
    const bookList = useSelector((store) => store.bookList.bookList);
    // subCategory
    const [listSubCategory, setListSubCategory] = useState({})
    const [valueSubCategory, setValueSubCategory] = useState("ایرانی")

    useEffect(() => {
        axios.get('http://localhost:5000/subCategories')
            .then(response => {
                if (response.data) {
                    let x = response.data.find((item) => category == item.category)
                    setListSubCategory({ ...x })
                }
            })
    }, [category])


    useEffect(() => {
        if (editNameBook) {
            setBookName(editNameBook)
            setCategory(editCategory)
            setValueSubCategory(editSubCategory)
            if (editImg) {
                setFileData(editImg)
            }
            if (editDescription) {
                setDescription(editDescription)
            }
        }
    }, [])

    function addbook(e, editId) {
        e.preventDefault();
        if (putorpost == "post") {
            let maxId = uniqId(bookList)
            if (bookName && category) {
                let book = {
                    id: maxId + 1,
                    name: bookName,
                    category: category,
                    subCategory: valueSubCategory,
                    img: fileData,
                    description: description,
                    quantity: 0,
                    price: 0,
                }
                setResponseNewBook(BooksApi(book, 'post', 'http://localhost:5000/books/', ".کالا جدید با موفقیت اصافه شد"));
            }
        } else if (putorpost = "put") {
            let book = {
                id: editId,
                name: bookName,
                category: category,
                subCategory: valueSubCategory,
                img: fileData,
                description: description,
                quantity: quantity,
                price: price
            }
            putBookApi('http://localhost:5000/books/', editId, book)
        }
        dispatch(setLoading(true));
        setTimeout(() => {
            dispatch(setLoading(false));
        }, 1000);
    }

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        console.log(file);
        if (file) {
            setSelectedFile(file);
            const fileReader = new FileReader();
            fileReader.onload = () => {
                setFileData(fileReader.result);
            }
            fileReader.onerror = (error) => {
                toast.error('.آپلود عکس ناموفق! دوباره تلاش کنید')
            }
            fileReader.readAsDataURL(file);
        }
    };


    return (
        <Container maxWidth="lg">

            <HeaderModal titreModal={"افزودن / ویرایش کالا"} closeModal={closeModal} />


            <form noValidate onSubmit={(e) => addbook(e, editId)}>
                <Button
                    className={classes.margin_1}
                    variant="contained"
                    component="label"
                >
                    <input
                        type="file"
                        onChange={handleFileInput}
                    />
                </Button>
                <CssTextField
                    className={classes.margin_1}
                    required
                    fullWidth
                    label="نام کتاب"
                    value={bookName}
                    onChange={(e) => setBookName(e.target.value)}
                />

                <FormControl style={{ width: "45%" }} className={classes.margin_1}>
                    <InputLabel required style={{ color: COLORS.accentColor }}>دسته‌بندی</InputLabel>
                    <Select
                        native
                        className={classes.select}
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="رمان">رمان</option>
                        <option value="کودک">کودک</option>
                        <option value="تاریخی">تاریخی</option>
                        <option value="روانشناسی">روانشناسی</option>
                        <option value="غیره">غیره</option>
                    </Select>
                </FormControl>
                <FormControl style={{ width: "45%", marginRight: "10%" }} className={classes.margin_1}>
                    <InputLabel required style={{ color: COLORS.accentColor }}>دسته‌بندی</InputLabel>
                    <Select
                        native
                        className={classes.select}
                        value={valueSubCategory}
                        onChange={(e) => setValueSubCategory(e.target.value)}
                    >
                        {(listSubCategory.subCategory) ? listSubCategory.subCategory.map((item) => <option value={item}>{item}</option>) : false}

                    </Select>
                </FormControl>

                <CssTextField
                    className={classes.margin_1}
                    label="توضیحات"
                    multiline
                    rows={4}
                    fullWidth
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Button
                    type="submit"
                    variant="contained"
                    className={classes.margin_3}
                    style={{ background: COLORS.accentColor }}
                    fullWidth
                >
                    <Typography variant="h6">
                        {buttonName}
                    </Typography>
                </Button>
            </form>

        </Container>
    )
}


// AddBookModal