import react, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { COLORS, MARGIN } from '../styles/constants';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { toast, ToastContainer } from 'react-toastify';
import { BooksApi } from '../api/BooksApi';
import { setLoading } from '../store/actions/isLoading';
import { setBookList } from '../store/actions/bookList';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { putBookApi } from '../api/BooksApi'
import InfoList from './InfoList'
// 
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import HeaderModal from './HeaderModal';
import { styleButton } from '../styles/styleButton';

const useStyles = makeStyles((theme) => ({
    table: {
        background: COLORS.secondaryColor,
        width: "800px",
        marginTop: "20px",
        marginBottom: "20px",
        [theme.breakpoints.down('sm')]: {
            width: "100%",

        }
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
    margin_1: {
        marginTop: MARGIN.margin_1,
        marginBottom: MARGIN.margin_1,
    },
    margin_2: {
        marginBottom: MARGIN.margin_2,
        marginTop: MARGIN.margin_2,
    },
    margin_3: {
        marginBottom: MARGIN.margin_3,
        marginTop: MARGIN.margin_3,
    },
    flexCenter: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

}));

export default function OrderModal({ order, closeModal,...props }) {
    const classes = useStyles();
    const btn = styleButton()
    const dispatch = useDispatch();

    function delivered() {
        closeModal()
        order.delivered = true
        putBookApi('http://localhost:5000/orders/', order.id, order,"deliverd order")
        dispatch(setLoading(true));
        setTimeout(() => {
            dispatch(setLoading(false));
        }, 1000);

    }



    return (
        <Container maxWidth="lg">
            <HeaderModal titreModal={"نمایش سفارش"} closeModal={closeModal} />
            <InfoList subject="نام مشتری" info={order.userName} />
            <InfoList subject="آدرس" info={order.address} />
            <InfoList subject="تلفن" info={order.mobile} />
            <InfoList subject="زمان سفارش" info={order.orderTIme} />
            <InfoList subject="زمان تحویل" info={order.deliveryTime} />
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>کالا</TableCell>
                        <TableCell>قیمت</TableCell>
                        <TableCell>تعداد</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {order.orderList.map((row, index) =>
                        <TableRow key={row.index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{row.bookName}</TableCell>
                            <TableCell>{row.price}</TableCell>
                            <TableCell>{row.number}</TableCell>
                        </TableRow >)}
                </TableBody>
            </Table>
            <div className={classes.flexCenter}>
                {(!order.status) ? <Button className={`${classes.margin_2}  ${btn.btn}`} onClick={delivered}>تحویل شد</Button> : false}
            </div>
            <ToastContainer />
        </Container>
    )
}


