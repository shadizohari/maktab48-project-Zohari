import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { COLORS } from '../styles/constants'
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../store/actions/isLoading';


// major function
export default function MapBookList({ data, end, start, ...props }) {



    const dispatch = useDispatch();



    return (
        <>
            {data?.map((row, index) => (index < end && index >= start) ? (
                <TableRow key={row.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row.userName}</TableCell>
                    <TableCell></TableCell>
                    <TableCell>{row.orderTIme}</TableCell>
                    <TableCell>{row.status}</TableCell>
                   

                </TableRow >
            ) : false)}

        
        </>

    )
}
