import react, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { COLORS, MARGIN } from '../styles/constants';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { toast, ToastContainer } from 'react-toastify';
import { BooksApi } from '../api/BooksApi';
import { setLoading } from '../store/actions/isLoading';
import { setBookList } from '../store/actions/bookList';
import { useDispatch, useSelector } from 'react-redux';
import { uniqId } from '../utils/auth';
import axios from "axios";
import { putBookApi } from '../api/BooksApi'
import InfoList from './InfoList'
// 
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import HeaderModal from './HeaderModal';

const useStyles = makeStyles((theme) => ({
    table: {
        width: "800px",
        [theme.breakpoints.down('sm')]: {
            width: "100%",

        }
    },
    accentColor: {
        background: COLORS.accentColor,
        color: "white"
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

export default function OrderModal({ closeModal, userName, mobile, address, orderList, status, orderTIme, deliveryTime, ...props }) {
    const classes = useStyles();






    return (
        <Container maxWidth="lg">
            <HeaderModal titreModal={"نمایش سفارش"} closeModal={closeModal} />
            <InfoList subject="نام مشتری" info={userName} />
            <InfoList subject="آدرس" info={address} />
            <InfoList subject="تلفن" info={mobile} />
            <InfoList subject="زمان سفارش" info={orderTIme} />
            <InfoList subject="زمان تحویل" info={deliveryTime} />
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
                    {orderList.map((row, index) =>
                        <TableRow key={row.index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{row.bookName}</TableCell>
                            <TableCell>{row.price}</TableCell>
                            <TableCell>{row.number}</TableCell>
                        </TableRow >)}
                </TableBody>
            </Table>
            <div className={classes.flexCenter}>
                {(!deliveryTime) ? <Button className={`${classes.margin_2}  ${classes.accentColor}`}>تحویل شد</Button> : false}
            </div>
        </Container>
    )
}


