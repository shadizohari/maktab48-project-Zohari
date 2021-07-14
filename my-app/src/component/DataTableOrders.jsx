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
// import MapBookList from './MapBookList';
import { paginationCalculate } from '../utils/auth';
import DataTableHeader from './DataTableHeader';
import { usePagination } from '../hook/usePagination';
import styleModal from '../styles/styleModal';
import MapOrdersList from './MapOrdersList';
// import LoadingLayout from './LoadingLayout';





const useStyles = makeStyles((theme) => ({
    btn_pagination: {
        marginTop: "30px",
        paddingBottom: "200px",
    },

    accentColor: {
        background: COLORS.accentColor,
    }


}));

export default function DataTableOrders({ ...props }) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [filterResult, setFilterResult] = useState([]);
    const [value, setValue] = useState(false);
    const [array, setArray] = useState([]);
    const [length, setLength] = useState();
    const [orders, setOrders] = useState([]);


    // get data when load page
    useEffect(() => {
        axios.get('http://localhost:5000/orders')
            .then(response => {
                if (response.data) {
                    setOrders(response.data);
                    setLength(response.data.length)
                    console.log(response.data)

                }
            }).catch((err) => toast.error("request failed!"));
    }, [])



    // // table pagenation
    useEffect(() => {
        setArray(paginationCalculate(length, 5))
    }, [length])
    const { start, end, changePage, activePageNumber, setStart, setEnd, setActivePageNumber } = usePagination(5)




    const styleClassModal = styleModal();
    const isLoading = useSelector((store) => store.isLoading);
    useEffect(() => {
        setOpen(false);
    }, [isLoading]);


    // modal material.....
    const [open, setOpen] = useState(false);
    // modal material.....
    const handleOpen = () => {
        setOpen(true);
    };
    // modal material.....
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            {/* <LoadingLayout> */}
                <DataTableHeader titre="مدیریت سفارش‌ها" button={false} radio={true} />
                <DataTableContainer>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>نام کاربری</TableCell>
                            <TableCell>مجموع مبلغ</TableCell>
                            <TableCell>زمان ثبت سفارش‌</TableCell>
                            <TableCell></TableCell>


                        </TableRow>
                    </TableHead>
                    <TableBody>
                        < MapOrdersList data={orders} start={start} end={end} />
                    </TableBody>

                </DataTableContainer>

                <Container maxWidth="lg" className={classes.btn_pagination}>
                    {array?.map((num, index) => (
                        <Button style={{ margin: "5px" }} className={activePageNumber === index + 1 ? classes.accentColor : ""} key={num} variant="contained" onClick={() => { changePage(num) }}>{num}</Button>
                    ))}
                </Container>

            {/* </LoadingLayout> */}
            <ToastContainer />

        </div>
    );
}


