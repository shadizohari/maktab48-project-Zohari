import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import { COLORS } from '../styles/constants'
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../store/actions/isLoading';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { AiTwotoneEdit } from 'react-icons/ai';
import AddBookModal from './AddBookModal';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import styleModal from '../styles/styleModal'
import { deleteBookApi } from '../api/BooksApi'
// Dialog
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { CgDanger } from 'react-icons/cg';
// Dialog ... slide
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

// major function
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
        },
        btn_dialog: {
            width: "50%",
            background: COLORS.secondaryColor,
            '&:hover': {
                background: COLORS.accentColor
            }
        },
        icon_danger: {
            margin: "10px",
            color: COLORS.accentColor,
            fontSize: "30px"
        }

    }));



    const dispatch = useDispatch();
    const classes = useStyles();

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


    // edit book
    const [editNameBook, setEditNameBook] = useState("")
    const [editCategory, setEditCategory] = useState("")
    const [editDescription, setEditDescription] = useState("")
    const [editId, setEdeitId] = useState()
    const [editImg, setEditImg] = useState()
    const [editSubCategory, setEditSubCategory] = useState()
    function editBook(id, namebook, category, img, description, subCategory) {
        setOpen(true);
        setEditNameBook(namebook);
        setEditCategory(category);
        setEdeitId(id);
        setEditImg(img);
        setEditDescription(description);
        setEditSubCategory(subCategory)

    }
    // Dialog for delete
    const [openDialog, setOpenDialog] = useState(false);
    const [idDelete, setIdDelete] = useState();
    const handleClickOpenDialog = (id) => {
        setOpenDialog(true);
        setIdDelete(id);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    // delete book
    function deleteBook(id) {
        deleteBookApi('http://localhost:5000/books/', id);
        setOpenDialog(false);
        dispatch(setLoading(true));
        setTimeout(() => {
            dispatch(setLoading(false));
        }, 1000);

    }

    return (
        <>
            {data?.map((row, index) => (index < end && index >= start) ? (
                <TableRow key={row.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell> <Avatar className={classes.img_size} src={row.img} /></TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.category}</TableCell>
                    <TableCell onClick={() => editBook(row.id, row.name, row.category, row.img, row.description,row.subCategory)}><AiTwotoneEdit className={classes.icons} /></TableCell>
                    <TableCell onClick={() => handleClickOpenDialog(row.id)}><RiDeleteBin2Fill className={classes.icons} /></TableCell>

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
                        <AddBookModal closeModal={handleClose} editImg={editImg} editNameBook={editNameBook} editCategory={editCategory} editDescription={editDescription} buttonName={"ثبت"} putorpost={"put"} editId={editId} editSubCategory={editSubCategory} />
                    </div>
                </Fade>
            </Modal>

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                TransitionComponent={Transition}
                keepMounted
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <CgDanger className={classes.icon_danger} />
                <DialogTitle id="alert-dialog-title">آیا از حذف این کتاب اطمینان دارید؟</DialogTitle>
                <DialogContent>
                </DialogContent>
                <DialogActions>
                    <Button className={classes.btn_dialog} onClick={() => deleteBook(idDelete)} onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            deleteBook(idDelete)
                        }
                    }}>
                        حذف
                    </Button>
                    <Button className={classes.btn_dialog}
                        onClick={handleCloseDialog} onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleCloseDialog()
                            }
                        }} autoFocus>
                        خیر
                    </Button>
                </DialogActions>
            </Dialog>

        </>

    )
}
