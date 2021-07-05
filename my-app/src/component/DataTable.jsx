import React from 'react';
import { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import { COLORS } from '../styles/constantVariables'
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import DataTableContainer from './DataTableContainer';
import { useDispatch, useSelector } from 'react-redux';
import { setBookList } from '../store/actions/bookList';




const useStyles = makeStyles((theme) => ({
    img_size: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    margin: {
        marginRight: "10px",
    },

    btn_pagination: {
        marginTop: "30px",
        paddingBottom: "200px",
    },

    accentColor: {
        background: COLORS.accentColor,
    },

}));

export default function DataTable({ length, ...props }) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(10)
    const [array, setArray] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/books')
            .then(response => {
                setData(response.data);
                dispatch(setBookList(response.data));
            }, error => {
                toast.error(error);
            });
    }, [])

    useEffect(() => {
        let x = length % 10;
        let y;
        if (x != 0) {
            // y = (length / 10).ceil();
            y = (length / 10);

        } else {
            y = length / 10;
        }
        let arr = [];
        for (let i = 1; i <= y; i++) {
            arr.push(i)
        }
        setArray([...arr])
    }, [length])

    function changePage(num) {
        setStart((num - 1) * 10);
        setEnd(num * 10);
    }

    return (
        <div>
            <DataTableContainer>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>تصویر</TableCell>
                        <TableCell>نام کتاب</TableCell>
                        <TableCell>دسته‌بندی</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((row, index) => (index < end && index >= start) ? (
                        <TableRow key={row.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell> <Avatar className={classes.img_size} src={row.avatar} /></TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.subject}</TableCell>
                            <TableCell>ویرایش</TableCell>
                            <TableCell>حذف</TableCell>

                        </TableRow>

                    ) : false)}
                </TableBody>
            </DataTableContainer>
            {/* <div className={classes.btn_pagination}>
                        {array.map((num) => (
                            <Button className={classes.margin} key={num} variant="contained" onClick={() => { changePage(num) }}>{num}</Button>
                        ))}


                    </div> */}

            {/* <ToastContainer/> */}
        </div>
    );
}


