import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import { useSelector } from 'react-redux';
import TableRow from '@material-ui/core/TableRow';

// major function
export default function MapBookList({ data, end, start, ...props }) {
    const deliveredStatus = useSelector((store) => store.DeliveredStatus);

    return (
        <>
        
            {data?.map((row, index) => (index < end && index >= start) ? (
                (row.status == deliveredStatus) ? (
                    <TableRow key={row.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{row.userName}</TableCell>
                        <TableCell></TableCell>
                        <TableCell>{row.orderTIme}</TableCell>
                        <TableCell>بررسی سفارش‌</TableCell>


                    </TableRow >
                ) : false

            ) : false)}


        </>

    )
}
