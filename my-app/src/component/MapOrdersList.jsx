import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import { useSelector } from 'react-redux';
import TableRow from '@material-ui/core/TableRow';
import { styleLinkOrderList } from '../styles/styleLink'
import { formatPrice } from '../utils/auth';
// 
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import styleModal from '../styles/styleModal'
import OrderModal from './OrderModal'


// major function
export default function MapBookList({ data, end, start, ...props }) {
    const deliveredStatus = useSelector((store) => store.DeliveredStatus);
    function sum(array) {
        let sum = 0;
        for (let i = 0; i < array.length; i++) {
            sum += Number(array[i].number) * Number(array[i].price)
        }
        return formatPrice(sum)
    }

    // modal style
    const styleClassModal = styleModal();
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
    const link = styleLinkOrderList()


    const [order, setOrder] = useState("")



    // click and open modal
    function orderCheck(order) {

        handleOpen()
        setOrder(order)
    }



    return (
        <>

            {data?.map((row, index) => (index < end && index >= start) ? (
                (row.status == deliveredStatus) ? (
                    <TableRow key={row.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{row.userName}</TableCell>
                        <TableCell>{sum(row.orderList.map((item, i) => ({ price: item.price, number: item.number })))}</TableCell>
                        <TableCell>{row.orderTIme}</TableCell>
                        <TableCell className={link.link} onClick={() => orderCheck(row)}> بررسی سفارش‌</TableCell>


                    </TableRow >
                ) : false

            ) : false)
            }
            <Modal
                className={styleClassModal.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={styleClassModal.modal_paper}>
                        <OrderModal closeModal={handleClose} order={order}/>
                    </div>
                </Fade>
            </Modal>

        </>

    )
}
