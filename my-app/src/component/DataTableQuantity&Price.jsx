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
import Container from '@material-ui/core/Container';
import { paginationCalculate, formatPrice } from '../utils/auth';
import DataTableHeader from './DataTableHeader';
import { setLoading } from '../store/actions/isLoading';
import InputBase from '@material-ui/core/InputBase';
import { putBookApi } from '../api/BooksApi'
import { usePagination } from '../hook/usePagination';

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
            padding: "0px",
        }
    },
    styleInputChange: {
        color: COLORS.accentColor,
        textDecoration: `underline ${COLORS.accentColor}`,
    }
}));

export default function DataTableQuanitityandPrices({ ...props }) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [booksData, setBookData] = useState([])
    const [array, setArray] = useState([]);
    const [length, setLength] = useState(0);
    const [modifiedData, setModifiedData] = useState([]);
    const [styleInputChange, setStyleInputChange] = useState(classes.styleInputChange)
    const [idChange, setIdChange] = useState([])

    function setPriceValue(idRow) {
        if (booksData) {
            if (idChange.find(id => id == idRow)) {
                return booksData.find(item => item.id == idRow).price
            } else {
                return formatPrice(booksData.find(item => item.id == idRow).price)
            }
        }
    }

    // get data when load page
    useEffect(() => {
        axios.get('http://localhost:5000/books')
            .then(response => {
                if (response.data) {
                    setLength(response.data.length)
                    dispatch(setBookList(response.data));
                    setBookData(response.data);

                }
            }).catch((err) => toast.error("request failed!"));
    }, [])

    // function for handeling value input price and quantity
    function handelInput(e, id, input) {
        setIdChange([...idChange, id])
        e.target.type = "number"
        e.target.className = `${styleInputChange} MuiInputBase-input`;
        let i = booksData.findIndex((book, index) => book.id == id);
        booksData[i][input] = e.target.value;
        setBookData([...booksData]);

        let index = modifiedData.findIndex((book, index) => book.id == id);
        if (index > -1) {
            modifiedData[index][input] = e.target.value;
        } else {
            modifiedData.push(booksData[i])
        }
        setModifiedData([...modifiedData])
    }




    // // table pagenation
    useEffect(() => {
        setArray(paginationCalculate(length, 10))
    }, [length])
    const { start, end, changePage, activePageNumber } = usePagination(10)



    // put new data...
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    function putData() {
        console.log(idChange)
        // setIdChange([])
        modifiedData.forEach(async (book, indx) => {
            putBookApi('http://localhost:5000/books/', book.id, book);
            await sleep(500);
        });
        setStyleInputChange("");
        dispatch(setLoading(true));
        setTimeout(() => {
            dispatch(setLoading(false));
        }, 1000);
    }

    // map for data
    function mapDataQuantityPrice(booksData) {
        return (
            <>
                {
                    booksData?.map((row, index) => (index < end && index >= start) ? (
                        <TableRow key={row.id} className={classes.customTable}>
                            <TableCell style={{ padding: "16px" }}>{index + 1}</TableCell>
                            <TableCell style={{ padding: "16px" }}>{row.name}</TableCell>
                            <TableCell>
                                <InputBase
                                    className={classes.margin}
                                    value={setPriceValue(row.id)}
                                    type={"text"}
                                    onChange={(e, id) => handelInput(e, row.id, "price")}
                                    style={{ textDecoration: "underline", padding: "16px" }}
                                />
                            </TableCell>
                            <TableCell>
                                <InputBase
                                    className={classes.margin}
                                    value={(booksData.length > 0) ? booksData.find(item => item.id == row.id).quantity : false}
                                    type="number"
                                    onChange={(e, id) => handelInput(e, row.id, "quantity")}
                                    style={{ textDecoration: "underline", padding: "16px" }}

                                />
                            </TableCell>
                        </TableRow >
                    ) : false)
                }
            </>
        )

    }


    //    // search 
    const [searchValue, setSearchValue] = useState("")
    function searchInput(e) {
        setSearchValue(e.target.value)
    }
    const searchFunc = function (array) {
        return array.filter((book) => { return (book.name.includes(searchValue)) });
    }

    
    return (
        <div>
            <DataTableHeader titre="موجودی و قیمت‌ها" textBtn="ذخیره" handelClick={putData} searchInput={(e) => searchInput(e)} />
            <DataTableContainer>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>نام کتاب</TableCell>
                        <TableCell>قیمت‌ (تومان) </TableCell>
                        <TableCell>موجودی</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(!searchValue ? mapDataQuantityPrice(booksData) : mapDataQuantityPrice(searchFunc(booksData)))}
                </TableBody>

            </DataTableContainer>

            <Container maxWidth="lg" className={classes.btn_pagination}>
                {array?.map((num, index) => (
                    <Button style={{ margin: "5px" }} className={activePageNumber === index + 1 ? classes.accentColor : ""} key={num} variant="contained" onClick={() => { changePage(num) }}>{num}</Button>
                ))}
            </Container>
            <ToastContainer />

        </div>
    );
}


