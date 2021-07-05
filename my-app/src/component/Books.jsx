import React from 'react';
import { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { COLORS } from '../styles/constantVariables'
import axios from "axios";
import { toast,ToastContainer } from 'react-toastify';


const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 350,
    },
    large: {
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
    flex_center: {
        display: "flex",
        justifyContent: "center",
    },
    accentColor: {
        background: COLORS.accentColor,
    },


}));

export default function TableData({ length, ...props }) {

    const classes = useStyles();
    const [data, setData] = useState([]);
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(10)
    const [array, setArray] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/books')
            .then(response => {
                setData(response.data);
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
            <Grid container spacing={3} className={classes.flex_center}>
                <Grid item lg={6} xs={12}>
                    <div>
                        <TableContainer>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell>تصویر</TableCell>
                                        <TableCell>نام کتاب</TableCell>
                                        <TableCell>دسته‌بندی</TableCell>
                                        <TableCell></TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data?.map((row, index) => (index < end && index >= start) ? (
                                        <TableRow key={row.id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell> <Avatar className={classes.large} src={row.avatar} /></TableCell>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.subject}</TableCell>
                                        </TableRow>

                                    ) : false)}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </div>
                    <Button
                        variant="contained"
                        color={COLORS.accentColor}
                    className={classes.accentColor}
                    >
                        اضافه کردن کالا
                    </Button>
                    {/* <div className={classes.btn_pagination}>
                        {array.map((num) => (
                            <Button className={classes.margin} key={num} variant="contained" onClick={() => { changePage(num) }}>{num}</Button>
                        ))}


                    </div> */}
                </Grid>
            </Grid>
        </div>
    );
}


