import React, { useEffect, useState } from 'react';
import LayoutAdminPanel from '../../storeComponents/LayoutPage';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Container, Button, Typography } from '@material-ui/core';
import { formatPrice } from '../../utils/auth'
import { COLORS } from '../../styles/constants'
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../store/actions/isLoading';
import { FaLongArrowAltLeft } from "react-icons/fa"
import { styleTitle } from '../../styles/styleTitle';

const useStyles = makeStyles((theme) => ({
    parent_row: {
        display: "flex",
        marginTop: "20px",
        [theme.breakpoints.down('sm')]: {
            flexDirection: "column",
            justifyContent: "flex-start"
        }
    },
    parent_price: {
        width: "100%",
        display: "flex",
        flexDirection: "row-reverse",
        marginTop: "20px",
        justifyContent: "space-between",
        [theme.breakpoints.down('sm')]: {
            flexDirection: "column",
            justifyContent: "flex-start"
        }
    },
    notExisting: {
        marginTop: "20px",
        color: "red",
    },
    parent_column: {
        marginLeft: "50px",
        marginTop: "20px",
        flexGrow: "1",

    },
    imgClass: {
        width: "30%",
        [theme.breakpoints.down('sm')]: {
            width: "60%",
            margin: "auto"
        }
    },
    marginTop: {
        marginTop: "20px"

    },
    price:{
        marginTop: "20px",
        borderBottom: `3px solid ${COLORS.accentColor}`,
        [theme.breakpoints.down('sm')]: {
            borderBottom: `0px`,
        }
    },
    btn: {
        background: COLORS.accentColor,
        marginTop: "20px",
        color: "white",
        fontSize: "18px",
        '&:hover': {
            background: COLORS.primeryColor,
            // color:COLORS.primeryColor
        }
    },
    parent_category: {
        display: "flex",
        alignItems: "center",
        borderBottom: `3px solid ${COLORS.accentColor}`,
        paddingBottom: "10px"

    },
    arrow_icon: {
        color: COLORS.accentColor,
        paddingRight: "5px",
        paddingLeft: "5px",
        fontSize: "25px"
    }


}));


function ProductPage({ ...props }) {
    const dispatch = useDispatch();

    const [book, setBook] = useState()
    // const[price,setPrice]=useState()
    const history = useHistory()
    const path = history.location.pathname
    const index = path.indexOf('/', 1)
    const id = path.slice(index + 1)
    // const [numberOfInput, setNumberOfInput] = useState(1)
    useEffect(() => {
        axios.get(`http://localhost:5000/books/${id}`)
            .then(response => {
                if (response.data) {
                    setBook(response.data)
                    // setPrice(response.data.price)
                } else {
                    console.log("error")
                }
            })
    }, [])
    // function bookNumber(value) {
    //     if (value)
    //         console.log(value)
    // }
    function addToCart(bookId) {

        if (localStorage.cart && localStorage.cart.length > 0) {
            appendToStorage(bookId)
        } else {
            const x = { "bookName": book.name, "price": book.price, "category": book.category, "number": 1, "id": book.id, "quantity": book.quantity }
            localStorage.setItem("cart", JSON.stringify([{ ...x }]))
        }
        history.push("/cart")
        dispatch(setLoading(true));
        setTimeout(() => {
            dispatch(setLoading(false));
        }, 1000);
    }
    function appendToStorage(bookId) {
        let flag = false;
        let arrayCart = JSON.parse(localStorage.getItem("cart"));
        for (let i = 0; i < arrayCart.length; i++) {
            if (arrayCart[i].id == bookId) {
                flag = true
                if(Number(arrayCart[i].number) + 1 <= book.quantity){
                    arrayCart[i].number = Number(arrayCart[i].number) + 1
                    localStorage.setItem("cart", JSON.stringify(arrayCart))
                }else{
                    alert("this not mojod")
                }
            }
        }
        if (!flag) {
            const x = { "bookName": book.name, "price": book.price, "category": book.category, "number": 1, "id": book.id, "quantity": book.quantity }
            arrayCart.push({ ...x })
            localStorage.setItem("cart", JSON.stringify(arrayCart))
        }
    }
    const classesTitle = styleTitle();

    const classes = useStyles()
    return (
        <>
            <LayoutAdminPanel >

                <Container>
                    <Typography variant="h4" className={classesTitle.title} >
                        {book?.name}
                    </Typography>
                </Container>
                <Container className={classes.parent_row}>

                    <img className={classes.imgClass} src={book?.img} />
                    <div className={classes.parent_column}>
                        <div style={{ display: "inline-block" }}>
                            <div className={classes.parent_category}>
                                <Typography variant="h5" className={classes.category}>
                                    {book?.category}
                                </Typography >
                                <FaLongArrowAltLeft className={classes.arrow_icon} />
                                <Typography variant="h5" className={classes.subCategory}>
                                    {book?.subCategory}
                                </Typography>
                            </div>
                        </div>
                        <p className={classes.marginTop}>
                            {book?.description}
                        </p>
                        {book?.quantity > 0 ?
                            <div className={classes.parent_price}>
                                <Typography variant="h5" className={classes.price}>
                                    قیمت: {formatPrice(book?.price)} تومان
                                </Typography>
                                <Button onClick={() => addToCart(book.id)} className={classes.btn}>افزودن به سبدخرید</Button></div> :
                            <Typography className={classes.notExisting} variant="h4">
                                ناموجود
                            </Typography >}

                    </div>
                </Container>
            </LayoutAdminPanel >

        </>
    )

}

export default ProductPage