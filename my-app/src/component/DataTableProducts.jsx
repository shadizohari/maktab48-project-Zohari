import React from 'react';
import { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { COLORS } from '../styles/constants'
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import DataTableContainer from './DataTableContainer';
import { useDispatch, useSelector } from 'react-redux';
import { setBookList } from '../store/actions/bookList';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Container from '@material-ui/core/Container';
import MapBookList from './MapBookList';
import { paginationCalculate } from '../utils/auth';
import DataTableHeader from './DataTableHeader';
import { usePagination } from '../hook/usePagination';
import styleModal from '../styles/styleModal';
import { setLoading } from '../store/actions/isLoading';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AddBookModal from './AddBookModal';



const useStyles = makeStyles((theme) => ({
    btn_pagination: {
        marginTop: "30px",
        paddingBottom: "200px",
    },

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
    }

}));

export default function DataTableProducts({ ...props }) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [filterResult, setFilterResult] = useState([]);
    const [value, setValue] = useState(false);
    const [array, setArray] = useState([]);
    const [length, setLength] = useState();


    const data = useSelector((store) => store.bookList.bookList);

    // get data when load page
    useEffect(() => {
        axios.get('http://localhost:5000/books')
            .then(response => {
                if (response.data) {
                    // setData(response.data);
                    setLength(response.data.length)
                    dispatch(setBookList(response.data));
                }
            }).catch((err) => toast.error(".درخواست با خطا مواجه شد!"));
    }, [])


    // filter books category
    function filter(e) {
        setValue(true);
        if (data) {
            if (e.target.value === "همه") {
                setFilterResult(data);
                setLength(data.length);
            } else {
                let result = data.filter(book => book.category == e.target.value);
                setFilterResult(result)
                setLength(result.length);
            }
            setStart(0);
            setEnd(5);
            setActivePageNumber(1)
        }
    }


    // // table pagenation
    useEffect(() => {
        setArray(paginationCalculate(length, 5))
    }, [length])
    const { start, end, changePage, activePageNumber, setStart, setEnd, setActivePageNumber } = usePagination(5)




    const styleClassModal = styleModal();
    const isLoading = useSelector((store) => store.isLoading);
    // useEffect(() => {
    //     // setOpen(false);
    // }, [isLoading]);


    // modal material.....
    const [open, setOpen] = useState(false);
    // modal material.....
    const handleOpen = () => {
        setOpen(true);
    };
    // modal material.....
    const handleClose = () => {
        setOpen(false);
    };


    // search 
    const [searchValue, setSearchValue] = useState("")
    function searchInput(e) {
        setSearchValue(e.target.value)
    }
    const searchFunc = function (array) {
        return array.filter((book) => { return (book.name.includes(searchValue)) });
    }

    
    return (
        <div>
            <DataTableHeader titre="مدیریت کالا" textBtn="اضافه کردن کالا" handelClick={handleOpen} searchInput={(e) => searchInput(e)} />
            <DataTableContainer>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>تصویر</TableCell>
                        <TableCell>نام کتاب</TableCell>
                        <TableCell>
                            <FormControl className={classes.formControl}>
                                <InputLabel style={{ color: COLORS.accentColor }}>دسته‌بندی</InputLabel>
                                <Select
                                    native
                                    className={classes.select}
                                    onChange={filter}
                                >
                                    <option value="همه">همه</option>
                                    <option value="رمان">رمان</option>
                                    <option value="کودک">کودک</option>
                                    <option value="تاریخی">تاریخی</option>
                                    <option value="روانشناسی">روانشناسی</option>

                                </Select>
                            </FormControl>
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {(!value ?
                         (!searchValue ? < MapBookList data={data} start={start} end={end} /> : < MapBookList data={searchFunc(data)} start={start} end={end} />) : 
                         (!searchValue ? < MapBookList data={filterResult} start={start} end={end} /> : < MapBookList data={searchFunc(filterResult)} start={start} end={end} />))}
                </TableBody>

            </DataTableContainer>

            <Container maxWidth="lg" className={classes.btn_pagination}>
                {array?.map((num, index) => (
                    <Button style={{ margin: "5px" }} className={activePageNumber === index + 1 ? classes.accentColor : ""} key={num} variant="contained" onClick={() => { changePage(num) }}>{num}</Button>
                ))}
            </Container>

            <Modal
                className={styleClassModal.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={styleClassModal.modal_paper}>
                        <AddBookModal buttonName={"ذخیره"} putorpost={"post"} closeModal={handleClose} />
                    </div>
                </Fade>
            </Modal>
            <ToastContainer />

        </div>
    );
}


