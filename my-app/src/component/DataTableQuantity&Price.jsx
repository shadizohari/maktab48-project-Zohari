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
import { setLoading } from '../store/actions/isLoading';
import InputBase from '@material-ui/core/InputBase';






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

export default function DataTableQuanitityandPrices({ ...props }) {
    const dispatch = useDispatch();
    const classes = useStyles();
    // const [data, setData] = useState([]);
    const [value, setValue] = useState(false);
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(5)
    const [array, setArray] = useState([]);
    const [length, setLength] = useState();
    const [activePageNumber, setActivePageNumber] = useState(1);




    // get data when load page
    useEffect(() => {
        axios.get('http://localhost:5000/books')
            .then(response => {
                if (response.data) {
                    setLength(response.data.length)
                    dispatch(setBookList(response.data));

                }
            }).catch((err) => toast.error("request failed!"));
    }, [])

    const data = useSelector((store) => store.bookList.bookList);

    // table pagenation
    useEffect(() => {
        setArray(paginationCalculate(length))
    }, [length])
    function changePage(num) {
        setStart((num - 1) * 5);
        setEnd(num * 5);
        setActivePageNumber(num);
    }


    // example...
    function openloading() {
        dispatch(setLoading(true));
        setTimeout(() => {
            dispatch(setLoading(false));
        }, 1000);
    }

    return (
        <div>
            <DataTableHeader titre="موجودی و قیمت‌ها" textBtn="ذخیره" handelClick={openloading} />
            <DataTableContainer>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>نام کتاب</TableCell>
                        <TableCell>قیمت‌</TableCell>
                        <TableCell>موجودی</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/*  < MapBookList data={data} start={start} end={end} /> } */}
                    {data?.map((row, index) => (index < end && index >= start) ? (
                        <TableRow key={row.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>
                                <InputBase
                                    className={classes.margin}
                                    defaultValue="" 
                                    style={{textDecoration:"underline red"}}
                                />
                            </TableCell>
                            <TableCell>
                                <InputBase
                                    className={classes.margin}
                                    defaultValue=""
                                    type="number"
                                    style={{textDecoration:"underline"}}

                                />
                            </TableCell>
                        </TableRow >
                    ) : false)}
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


