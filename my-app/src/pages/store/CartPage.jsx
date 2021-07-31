import React, { useEffect, useState } from 'react';
import LayoutAdminPanel from '../../storeComponents/LayoutPage';
import { Container, Button, Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { formatPrice } from '../../utils/auth';
import { COLORS } from '../../styles/constants';
import { makeStyles } from '@material-ui/core/styles';
import { styleTitle } from '../../styles/styleTitle';
import TextField from '@material-ui/core/TextField';
import { Link } from "react-router-dom";
import LoadingLayout from '../../component/LoadingLayout';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../store/actions/isLoading';
import DataTableContainer from '../../component/DataTableContainer'
import { RiDeleteBin2Fill } from "react-icons/ri";
import { toast, ToastContainer } from 'react-toastify';
import axios from "axios";
import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    parent_table: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    btn: {
        background: COLORS.accentColor,
        color: "white",
        fontSize: "20px",
        "&:hover": {
            background: COLORS.primeryColor,
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: "20px",
        }
    },
    delete_icon: {
        color: COLORS.accentColor,
        fontSize: "24px",
        cursor: "pointer",
        "&:hover": {
            color: COLORS.primeryColor
        }
    },
    link: {
        fontSize: "18px",
        color: COLORS.primeryColor,
        "&:hover": {
            color: COLORS.accentColor,
            textDecoration: "none"
        }
    },
    parent_btnCart: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "20px",
        [theme.breakpoints.down('sm')]: {
            flexDirection: "column",
            justifyContent: "flex-start"
        }
    },
    price: {
        borderBottom: `3px solid ${COLORS.accentColor}`,
        [theme.breakpoints.down('sm')]: {
            border:"0px"
        }
    }
}));
<fieldset disabled="disabled"></fieldset>

function CartPage({ ...props }) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const classesTitle = styleTitle();
    const [cartData, setCartData] = useState();
    const [sumCart, setSumCart] = useState(0);
    const [dataBooks, setDataBooks] = useState();
    let history = useHistory();
    useEffect(() => {
        setCartData(JSON.parse(localStorage.getItem("cart")));
        axios.get('http://localhost:5000/books')
            .then(response => {
                if (response.data) {
                    setDataBooks(response.data)
                }
            })
    }, [])

    useEffect(() => {
        if (cartData) {
            let sum = 0;
            for (let i = 0; i < cartData.length; i++) {
                sum += (cartData[i].number) * (cartData[i].price)
            }
            setSumCart(sum);
        }
    }, [cartData])


    function bookNumber(newValue, id) {

        let arrayCart = JSON.parse(localStorage.getItem("cart"));
        for (let i = 0; i < arrayCart.length; i++) {
            if (arrayCart[i].id == id) {
                arrayCart[i].number = Number(newValue)
                localStorage.setItem("cart", JSON.stringify(arrayCart))
                window.location.reload();
            }
        }
        dispatch(setLoading(true));
        setTimeout(() => {
            dispatch(setLoading(false));
        }, 1000);
    }
    function deleteItem(id) {
        let arrayCart = JSON.parse(localStorage.getItem("cart"));
        for (let i = 0; i < arrayCart.length; i++) {
            if (arrayCart[i].id == id) {
                arrayCart.splice(i, 1)
                localStorage.setItem("cart", JSON.stringify(arrayCart))
                window.location.reload();
            }
        }
        dispatch(setLoading(true));
        setTimeout(() => {
            dispatch(setLoading(false));
        }, 1000);
    }
    function finilizeCart() {
        history.push("/cart/order_info");
        // let arrayCart = JSON.parse(localStorage.getItem("cart"));
        // axios.get('http://localhost:5000/books')
        //     .then(response => {
        //         if (response.data) {
        //             console.log(response.data)
        //             for (let i = 0; i < arrayCart.length; i++) {
        //                 console.log(arrayCart[i])
        //                 for (let j = 0; j < response.data.length; j++) {
        //                     if (response.data[j].id == arrayCart[i].id) {
        //                         if (Number(response.data[j].quantity) < Number(arrayCart[i].number)) {
        //                             arrayCart.splice(i, 1)
        //                             localStorage.setItem("cart", JSON.stringify(arrayCart))
        //                             window.location.reload();
        //                             return false
        //                         }
        //                     }
        //                 }
        //             }
        //         }

        // })

        // dispatch(setLoading(true));
        // setTimeout(() => {
        //     dispatch(setLoading(false));
        // }, 1000);

    }
    return (
        <LoadingLayout>
            <LayoutAdminPanel>
                <Container>
                    <Container>
                        <Typography variant="h5" className={classesTitle.title} >
                            سبد خرید
                        </Typography>
                    </Container>
                    <div className={classes.parent_table}>
                        {/* <Table className={classes.table}> */}
                        < DataTableContainer>
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell>کالا</TableCell>
                                    <TableCell>تعداد</TableCell>
                                    <TableCell>قیمت</TableCell>
                                    <TableCell></TableCell>


                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {cartData?.map((item, index) => {
                                    return (<TableRow key={item.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell><Link className={classes.link} to={`/product/${item.id}`}>{item.bookName}</Link></TableCell>
                                        <TableCell>
                                            <TextField
                                                label="تعداد"
                                                value={item.number}
                                                type="number"
                                                InputProps={{ inputProps: { min: 1, max: item.quantity } }}
                                                onChange={(e) => bookNumber(e.target.value, item.id)}
                                            />
                                        </TableCell>
                                        <TableCell>{formatPrice(item.price * item.number)}</TableCell>
                                        <TableCell><p onClick={() => deleteItem(item.id)}><RiDeleteBin2Fill className={classes.delete_icon} /></p></TableCell>
                                    </TableRow >)
                                })}



                            </TableBody>
                        </DataTableContainer>
                        {/* </Table> */}


                    </div>
                    <Container className={classes.parent_btnCart}>
                        <Typography className={classes.price} variant="h5" >
                            جمع کل: {formatPrice(sumCart)}
                        </Typography>
                        <Button className={classes.btn} onClick={finilizeCart}>نهایی کردن سبد خرید</Button>
                    </Container>
                </Container>
            </LayoutAdminPanel>
            <ToastContainer />
        </LoadingLayout>
    )
}
export default CartPage
