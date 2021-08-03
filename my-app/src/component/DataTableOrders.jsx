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


// import { DeliveredStatusContext, DeliveredStatus } from '../context/DeliveredStatusContext';





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
    const deliveredStatus = useSelector((store) => store.DeliveredStatus);
    const [enroute, setEnroute] = useState([]);
    const [delivered, setDelivered] = useState([]);

    // get data when load page
    useEffect(() => {
        axios.get('http://localhost:5000/orders')
            .then(response => {
                if (response.data) {
                    setOrders(response.data);
                    // setLength(response.data.length)
                }
            }).catch((err) => toast.error(".درخواست با خطا مواجه شد!"));
    }, [])

    // division data to enroute and delivered for pagination
    useEffect(() => {
        let enrouteArray = [];
        let deliveredArray = [];
        orders.forEach(order => {
            (order.status == "enroute") ? enrouteArray.push(order) : deliveredArray.push(order)
        });
        setEnroute([...enrouteArray])
        setDelivered([...deliveredArray])
    }, [orders])

    useEffect(() => {
        if (deliveredStatus == "enroute") {
            setLength(enroute.length)
        } else {
            setLength(delivered.length)
        }
        changePage(1) 
    }, [enroute, delivered, deliveredStatus])

    // table pagenation
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


    // search 
    const [searchValue, setSearchValue] = useState("")
    function searchInput(e) {
        setSearchValue(e.target.value)
    }
    const searchFunc = function (array) {
        return array.filter((book) => { return (book.userName.includes(searchValue)) });
    }


    return (
        <div>
            <DataTableHeader titre="مدیریت سفارش‌ها" button={false} radio={true} searchInput={(e) => searchInput(e)} />
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

                    {!searchValue ? < MapOrdersList data={orders} start={start} end={end} /> : < MapOrdersList data={searchFunc(orders)} start={start} end={end} />}

                </TableBody>

            </DataTableContainer>

            {!searchValue && <Container maxWidth="lg" className={classes.btn_pagination}>
                {array?.map((num, index) => (
                    <Button style={{ margin: "5px" }} className={activePageNumber === index + 1 ? classes.accentColor : ""} key={num} variant="contained" onClick={() => { changePage(num) }}>{num}</Button>
                ))}
            </Container>}
            <ToastContainer />

        </div>
    );
}


