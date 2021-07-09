import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import { COLORS } from '../styles/constants'
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../store/actions/isLoading';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { AiTwotoneEdit } from 'react-icons/ai';

const useStyles = makeStyles((theme) => ({
    img_size: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },

    accentColor: {
        background: COLORS.accentColor,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    icons: {
        color: COLORS.primeryColor,
        fontSize: "24px",
        cursor: "pointer",
        '&:hover': {
            color: COLORS.accentColor,
        }
    }

}));

// map books for show data in table
export default function MapBookList({ data, end, start, ...props }) {
    const dispatch = useDispatch();
    const classes = useStyles();

    // delete book
    function deleteBook(id) {
        axios.delete('http://localhost:5000/books/' + id)
            .then(response => console.log(response))
            .catch(error => {
                console.error('There was an error!');
            });
        dispatch(setLoading(true));
        setTimeout(() => {
            dispatch(setLoading(false));
        }, 1000);
    }
    // edit book
    function editBook(id) {
        console.log(id)
    }

    return (
        <>
            {data?.map((row, index) => (index < end && index >= start) ? (
                <TableRow key={row.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell> <Avatar className={classes.img_size} src={row.img} /></TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.subject}</TableCell>
                    <TableCell onClick={() => editBook(row.id)}><AiTwotoneEdit className={classes.icons} /></TableCell>
                    <TableCell onClick={() => deleteBook(row.id)}><RiDeleteBin2Fill className={classes.icons} /></TableCell>
                </TableRow >
            ) : false)

            }
        </>
    )
}