import React, { useEffect, useState } from 'react';
import LayoutAdminPanel from '../../storeComponents/LayoutPage';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Container, Button, Typography } from '@material-ui/core';
import { formatPrice } from '../../utils/auth'
import { COLORS } from '../../styles/constants'
// import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
    parent_row: {
        display: "flex",
        marginTop: "20px",
    },
    title: {
        borderBottom: `3px solid ${COLORS.accentColor}`,
        display: "inline-block",
        paddingBottom: "10px"

    },
    parent_column: {
        marginLeft: "50px",
        marginTop: "20px"

    },
    imgClass: {
        width: "30%"
    },
    marginTop: {
        marginTop: "20px"

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
    }


}));


function ProductPage() {
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
    function addToCart() {
        if (localStorage.cart) {
            appendToStorage()
        } else {
            localStorage.setItem("cart", JSON.stringify([{ ...book, number: 1 }]))
        }
        history.push("/cart")
    }
    function appendToStorage() {
        let flag = false;
        let arrayCart = JSON.parse(localStorage.getItem("cart"));
        for (let i = 0; i < arrayCart.length; i++) {
            if (arrayCart[i].id == id) {
                flag = true
                arrayCart[i].number = Number(arrayCart[i].number) + 1
                localStorage.setItem("cart", JSON.stringify(arrayCart))
            }
        }
        if (!flag) {
            arrayCart.push({ ...book, number: 1 })
            localStorage.setItem("cart", JSON.stringify(arrayCart))
        }
    }

    const classes = useStyles()
    return (
        <>
            <LayoutAdminPanel >
                <Container className={classes.parent_row}>
                    <img className={classes.imgClass} src={book?.img} />
                    <div className={classes.parent_column}>
                        <Typography variant="h4" className={classes.title}>
                            {book?.name}
                        </Typography>
                        <p className={classes.marginTop}>
                            {book?.description}
                        </p>
                        <Typography variant="h5" className={classes.marginTop}>
                            قیمت: {formatPrice(book?.price)} تومان
                        </Typography>
                        <Button onClick={addToCart} className={classes.btn}>افزودن به سبدخرید</Button>

                        {/* <TextField
                        label="تعداد"
                        defaultValue="1"
                        type="number"
                        InputProps={{ inputProps: { min: 1, max: book?.quantity } }}
                        onChange={(e) => bookNumber(e.target.value)}
                    /> */}
                    </div>
                </Container>
            </LayoutAdminPanel >

        </>
    )

}

export default ProductPage