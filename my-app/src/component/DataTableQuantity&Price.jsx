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
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";


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
        border: "1px solid"
    },
    btn_sort_left: {
        color: COLORS.primeryColor,
        marginLeft: "10px",
        cursor: "pointer",
        fontSize: "15px",
        '&:hover': {
            color: COLORS.accentColor
        }, [theme.breakpoints.down('sm')]: {
            display: "none",
        },
    },
    btn_sort_right: {
        color: COLORS.primeryColor,
        marginRight: "10px",
        cursor: "pointer",
        fontSize: "15px",
        '&:hover': {
            color: COLORS.accentColor
        },
        [theme.breakpoints.down('sm')]: {
            display: "none",
        },
    },
    displayNone: {
        [theme.breakpoints.down('sm')]: {
            display: "none",
        },
    }
}));

export default function DataTableQuanitityandPrices() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [booksData, setBookData] = useState([])
    const [array, setArray] = useState([]);
    const [length, setLength] = useState(0);
    const [modifiedData, setModifiedData] = useState([]);
    const [styleInputChange, setStyleInputChange] = useState(classes.styleInputChange)
    const [idChange, setIdChange] = useState([])
    const [isEdinting, setEditing] = useState(false)
    const [disabled, setDisabled] = useState("disabled")

    // for disabled or notdisabled button "ذخیره"
    useEffect(() => {
        if (isEdinting) {
            setDisabled("")
        } else {
            setDisabled("disabled")
        }
        console.log(modifiedData)
    }, [isEdinting])



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
            }).catch((err) => toast.error(".درخواست با خطا مواجه شد!"));
    }, [])

    // function for handeling value input price and quantity
    function handelInput(e, id, input) {
        setEditing(true)
        setIdChange([...idChange, id])
        e.target.type = "number"
        e.target.className = `MuiInputBase-input ${styleInputChange} `;
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

    useEffect(() => {
        console.log("no")
        if (modifiedData.length < 1) {
            console.log("ok")
            setEditing(false)
        }
    }, [modifiedData])

    const handelESC = async (e, id, input) => {
        if (e.key === 'Escape') {
            try {
                const response = await fetch(`http://localhost:5000/books/${id}`);
                const data = await response.json();
                let i = booksData.findIndex((book, index) => book.id == id);
                e.target.type = "text"
                // e.target.value = formatPrice(data[input]);
                booksData[i][input] = data[input];
                setBookData([...booksData]);
                e.target.className = `MuiInputBase-input`;
            } catch (err) {
                console.log(err)
            }
            let index = (modifiedData.findIndex((item) => item.id == id))
            if (index > -1) {
                modifiedData.splice(index, 1)
                setModifiedData([...modifiedData])
            }
            // let i = (idChange.findIndex((i) => i == id))
            // if (i > -1) {
            //     idChange.splice(i, 1)
            //     setIdChange([...idChange])
            // }
        }
    };




    // // table pagenation
    useEffect(() => {
        setArray(paginationCalculate(length, 5))
    }, [length])
    const { start, end, changePage, activePageNumber } = usePagination(5)


    // why this function load page no render?????
    function putData() {
        if (modifiedData.length > 0) {
            // setEditing(false)
            modifiedData.forEach(async (book, indx) => {
                putBookApi('http://localhost:5000/books/', book.id, book);
            });
            dispatch(setLoading(true));
            setTimeout(() => {
                dispatch(setLoading(false));
            }, 1000);
        }
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
                                    onChange={(e) => handelInput(e, row.id, "price")}
                                    onKeyUp={(e) => handelESC(e, row.id, "price")}
                                    style={{ textDecoration: "underline", padding: "16px" }}
                                />
                            </TableCell>
                            <TableCell>
                                <InputBase
                                    className={classes.margin}
                                    value={(booksData.length > 0) ? booksData.find(item => item.id == row.id).quantity : false}
                                    type="number"
                                    onChange={(e) => handelInput(e, row.id, "quantity")}
                                    onKeyUp={(e) => handelESC(e, row.id, "quantity")}
                                    style={{ textDecoration: "underline", padding: "16px" }}

                                />
                            </TableCell>
                        </TableRow >
                    ) : false)
                }
            </>
        )

    }


    // search 
    const [searchValue, setSearchValue] = useState("")
    function searchInput(e) {
        setSearchValue(e.target.value)
    }
    const searchFunc = function (array) {
        return array.filter((book) => { return (book.name.includes(searchValue)) });
    }
    // sort
    const [sort, setSort] = useState("idBook")
    const sortPrice = function (a, b) {
        if (sort == "uptodownPrice") { return b.price - a.price } else if (sort == "downtoupPrice") {
            return a.price - b.price
        } else if (sort == "downtoupQuantity") {
            return a.quantity - b.quantity
        } else if (sort == "uptodownQuantity") {
            return b.quantity - a.quantity
        } else if (sort == "idBook") {
            return a.id - b.id
        }
    }
    return (
        <div>
            <DataTableHeader titre="موجودی و قیمت‌ها" textBtn="ذخیره" disabled={disabled} handelClick={putData} searchInput={(e) => searchInput(e)} />
            <DataTableContainer>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>
                            نام کتاب
                            <FaLongArrowAltDown className={classes.btn_sort_left} onClick={() => setSort("idBook")} />
                        </TableCell>
                        <TableCell>
                            <FaLongArrowAltUp className={classes.btn_sort_right} onClick={() => setSort("uptodownPrice")} />
                            قیمت‌ &nbsp;<span className={classes.displayNone}>(تومان)</span>
                            <FaLongArrowAltDown className={classes.btn_sort_left} onClick={() => setSort("downtoupPrice")} />
                        </TableCell>

                        <TableCell>
                            <FaLongArrowAltUp className={classes.btn_sort_right} onClick={() => setSort("uptodownQuantity")} />
                            موجودی
                            <FaLongArrowAltDown className={classes.btn_sort_left} onClick={() => setSort("downtoupQuantity")} />
                        </TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {(isEdinting) ? (mapDataQuantityPrice(booksData)) : ((searchValue ? mapDataQuantityPrice(searchFunc(booksData)) : mapDataQuantityPrice(booksData.sort(sortPrice))))}
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


