import React, { useState } from 'react';
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
import AddBookModal from './AddBookModal';
// import Container from '@material-ui/core/Container';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
// import LoadingLayout from '../../component/LoadingLayout';
import styleModal from '../styles/styleModal'
import {deleteBookApi} from '../api/BooksApi'
// map books for show data in table
export default function MapBookList({ data, end, start, ...props }) {

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
            },
        }

    }));



    const dispatch = useDispatch();
    const classes = useStyles();
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



    // delete book
    function deleteBook(id) {
            deleteBookApi('http://localhost:5000/books/',id);
            dispatch(setLoading(true));
            setTimeout(() => {
                dispatch(setLoading(false));
            }, 1000);

    }


    const [editNameBook, setEditNameBook] = useState("")
    const [editCategory, setEditCategory] = useState("")
    const [editDescription,setEditDescription] = useState("")
    const [editId, setEdeitId] = useState()
    const [editImg, setEditImg] = useState()
    // edit book
    function editBook(id, namebook, category, img, description) {
        setOpen(true);
        setEditNameBook(namebook);
        setEditCategory(category);
        setEdeitId(id);
        setEditImg(img);
        setEditDescription(description)

    }

    return (
        <>
            {data?.map((row, index) => (index < end && index >= start) ? (
                <TableRow key={row.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell> <Avatar className={classes.img_size} src={row.img} /></TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.subject}</TableCell>
                    <TableCell onClick={() => editBook(row.id, row.name, row.subject, row.img, row.description)}><AiTwotoneEdit className={classes.icons} /></TableCell>
                    <TableCell onClick={() => deleteBook(row.id)}><RiDeleteBin2Fill className={classes.icons} /></TableCell>
                </TableRow >
            ) : false)}

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
                        <AddBookModal editImg={editImg} editNameBook={editNameBook} editCategory={editCategory} editDescription={editDescription} buttonName={"ثبت"} putorpost={"put"} editId={editId} />
                    </div>
                </Fade>
            </Modal>

        </>

    )
}