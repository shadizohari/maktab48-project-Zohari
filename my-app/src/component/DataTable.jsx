import React from 'react';
import { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
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
// import { BooksApi } from '../api/BooksApi';


const useStyles = makeStyles((theme) => ({
    img_size: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
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
    },

}));

export default function DataTable({ ...props }) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [filterResult, setFilterResult] = useState([]);
    const [value, setValue] = useState(false);
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(5)
    const [array, setArray] = useState([]);
    const [length, setLength] = useState();
    const [activePageNumber, setActivePageNumber] = useState(1)
    useEffect(() => {
        axios.get('http://localhost:5000/books')
            .then(response => {
                if (response.data) {
                    setData(response.data);
                    setLength(response.data.length)
                    dispatch(setBookList(response.data));
                }
            }).catch((err) => toast.error("request failed!"));
    }, [])
    function filter(e) {
        setValue(true);
        console.log(e.target.value)
        if (data) {
            if (e.target.value === "همه") {
                setFilterResult(data);
                setLength(data.length);
            } else {
                let result = data.filter(book => book.subject == e.target.value);
                setFilterResult(result)
                setLength(result.length);
            }
            setStart(0);
            setEnd(5);
            setActivePageNumber(1)

        }
    }

    function mapBookList(data) {
        // function delete(){
           
        // }
        return (data.map((row, index) => (index < end && index >= start) ? (
            <TableRow key={row.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell> <Avatar className={classes.img_size} src={row.img} /></TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.subject}</TableCell>
                <TableCell>ویرایش</TableCell>
                {/* <TableCell onClick={() => delete (row.id)}>حذف</TableCell> */}
            </TableRow >
        ) : false)
        )
    }


    useEffect(() => {
        let x = length % 5;
        let y;
        if (x != 0) {
            y = (length / 5) + 1;
        } else {
            y = length / 5;
        }
        let arr = [];
        for (let i = 1; i <= y; i++) {
            arr.push(i)
        }
        setArray([...arr])
    }, [length])

    function changePage(num) {
        setStart((num - 1) * 5);
        setEnd(num * 5);
        setActivePageNumber(num);
    }


    return (
        <div>
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
                    {(!value ? mapBookList(data) : mapBookList(filterResult))}
                </TableBody>

            </DataTableContainer>

            <Container maxWidth="lg" className={classes.btn_pagination}>
                {array.map((num, index) => (
                    <Button style={{ margin: "5px" }} className={activePageNumber === index + 1 ? classes.accentColor : ""} key={num} variant="contained" onClick={() => { changePage(num) }}>{num}</Button>
                ))}
            </Container>
            <ToastContainer />

        </div>
    );
}


