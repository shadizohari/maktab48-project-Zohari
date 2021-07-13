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
import TextField from '@material-ui/core/TextField';







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
    },
    customTable: {
        "& .MuiTableCell-root": {
            padding: "0px" // <-- arbitrary value
        }
    },
}));

export default function DataTableQuanitityandPrices({ ...props }) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [data, setData] = useState([]);
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
                    setData(response.data)

                }
            }).catch((err) => toast.error("request failed!"));
    }, [])

    // const data = useSelector((store) => store.bookList.bookList);
    const [booksData, setBookData] = useState([])
    useEffect(() => {
        if (data) {
            setBookData([...data])
        }
    }, [data])
    function handelQuantity(e, id) {
        let i = booksData.findIndex((book, index) => book.id == id)
        booksData[i].quantity = e.target.value
        setBookData([...booksData])
    }



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
    // const [value, newvalue] = useState()
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
                        <TableRow key={row.id} className={classes.customTable}>
                            <TableCell style={{ padding: "16px" }}>{index + 1}</TableCell>
                            <TableCell style={{ padding: "16px" }}>{row.name}</TableCell>
                            <TableCell>
                                {/* <InputBase
                                        className={classes.margin}
                                        defaultValue="" 
                                        style={{textDecoration:"underline red"}}
                                    /> */}
                                <TextField variant="outlined" />
                            </TableCell>
                            <TableCell>
                                <InputBase
                                    className={classes.margin}
                                    // defaultValue={row.quantity==0?"ناموجود":row.quantity}
                                    value={(data.length > 0) ? data.find(item => item.id == row.id).quantity : false}
                                    type="number"
                                    onChange={(e, id) => handelQuantity(e, row.id)}
                                    style={{ textDecoration: "underline", padding: "16px" }}

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


// import * as React from 'react';
// import { DataGrid } from '@material-ui/data-grid';

// const columns = [
//   { field: 'id', headerName: 'ID', width: 90 },
//   {
//     field: 'firstName',
//     headerName: 'First name',
//     width: 150,
//     editable: true,
//   },
//   {
//     field: 'lastName',
//     headerName: 'Last name',
//     width: 150,
//     editable: true,
//   },
//   {
//     field: 'age',
//     headerName: 'Age',
//     type: 'number',
//     width: 110,
//     editable: true,
//   },
//   {
//     field: 'fullName',
//     headerName: 'Full name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (params) =>
//       `${params.getValue(params.id, 'firstName') || ''} ${
//         params.getValue(params.id, 'lastName') || ''
//       }`,
//   },
// ];

// const rows = [
//   {  lastName: 'Snow', firstName: 'Jon', age: 35 ,id: 1},
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

// export default function DataGridDemo() {
//   return (
//     <div style={{ height: 400, width: '100%',direction:'ltr' }}>
//       <DataGrid
//       style={{direction:'rtl' }}
//         rows={rows}
//         columns={columns}
//         pageSize={5}
//         checkboxSelection
//         disableSelectionOnClick
//       />
//     </div>
//   );
// }



