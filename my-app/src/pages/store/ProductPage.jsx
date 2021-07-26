import React, { useEffect, useState } from 'react';
import Header from '../../storeComponents/Header';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Container, Button, Typography } from '@material-ui/core';
import { formatPrice } from '../../utils/auth'
import { COLORS } from '../../styles/constants'

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
    btn:{
        background:COLORS.accentColor,
        marginTop: "20px",
        color:"white",
        fontSize:"18px",
        '&:hover':{
            background:COLORS.primeryColor,
            // color:COLORS.primeryColor
        }
    }


}));


function ProductPage() {
    const [book, setBook] = useState()
    // const[price,setPrice]=useState()
    const path = useHistory().location.pathname
    const index = path.indexOf('/', 1)
    const id = path.slice(index + 1)
    useEffect(() => {
        axios.get(`http://localhost:5000/books/${id}`)
            .then(response => {
                if (response.data) {
                    setBook(response.data)
                    // setPrice(response.data.price)
                    console.log(response.data)
                } else {
                    console.log("error")
                }
            })
    }, [])



    const classes = useStyles()
    return (
        <>
            <Header />
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
                    <Button className={classes.btn}>افزودن به سبدخرید</Button>
                </div>
            </Container>

        </>
    )

}

export default ProductPage