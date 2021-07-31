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
                // toast.error("Edited Failed!");
                console.log(error)
            }
            )
        history.push("/payment_result")
        dispatch(setLoading(true));
        setTimeout(() => {
            console.log("ok")
            dispatch(setLoading(false));
        }, 1000);

    }
    function dispensing() {
        history.push("/payment_result")
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