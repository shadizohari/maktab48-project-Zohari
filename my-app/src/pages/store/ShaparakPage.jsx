import shaparak from '../../assets/img/shaparak-1.png';
import React, { useEffect, useState } from 'react';
import { Container, Button, Typography } from '@material-ui/core';
import LayoutPage from '../../storeComponents/LayoutPage'
import { classes } from 'istanbul-lib-coverage';
import { makeStyles } from '@material-ui/core/styles';
import { COLORS, MARGIN } from '../../styles/constants';
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../store/actions/isLoading';
import { putBookApi } from '../../api/BooksApi'



const useStyles = makeStyles((theme) => ({
    parent_imgShaparak: {
        display: "flex",
        justifyContent: "center"
    },
    parent_btns: {
        display: "flex",
        justifyContent: "center",
        // marginTop:"20px",
    },
    btn_payment: {
        background: COLORS.green,
        margin: "20px",
        color: "white",
        "&:hover": {
            background: COLORS.green,
            // color:"white"
        }
    },
    btn_cancel: {
        background: "red",
        margin: "20px",
        color: "white",
        "&:hover": {
            background: "red",
            // color:"black"
        }
    }

}));
function ShaparakPage(params) {
    const classes = useStyles()
    const history = useHistory()
    const dispatch = useDispatch();

    function paymentSuccess() {
        axios.post("http://localhost:5000/orders", JSON.parse(localStorage.getItem("infoCart")))
            .then(response => { localStorage.removeItem("cart") })
            .catch(error => {
                console.log(error)
            }
            )
        let x = JSON.parse(localStorage.getItem("infoCart"))
        x.orderList.forEach(async (book, indx) => {
            axios.get(`http://localhost:5000/books/${book.id}`).
                then(response => {
                    response.data.quantity = Number(response.data.quantity) - Number(book.number)
                    axios.put(`http://localhost:5000/books/${book.id}`, response.data).
                        catch(error => {
                            console.log(error)
                        })
                })
        });


        history.push("/payment_result/true")
        dispatch(setLoading(true));
        setTimeout(() => {
            dispatch(setLoading(false));
        }, 1000);

    }
    function dispensing() {
        history.push("/payment_result/false")
        dispatch(setLoading(true));
        setTimeout(() => {
            dispatch(setLoading(false));
        }, 1000);
    }
    return (
        <LayoutPage>
            <Container>
                <div className={classes.parent_imgShaparak}>
                    <img src={shaparak} />
                </div>
                <div className={classes.parent_btns}>
                    <Button className={classes.btn_payment} onClick={paymentSuccess}>پرداخت</Button>
                    <Button className={classes.btn_cancel} onClick={dispensing}>انصراف</Button>


                </div>
            </Container>
        </LayoutPage>
    )

}
export default ShaparakPage