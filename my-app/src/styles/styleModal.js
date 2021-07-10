import { makeStyles } from '@material-ui/core/styles';

const styleModal = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        height: "100vh",
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal_paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxshadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    }
}));

export default styleModal;