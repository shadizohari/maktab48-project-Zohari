import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { COLORS, MARGIN } from '../styles/constants';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const useStyles = makeStyles((theme) => ({
    accentColor: {
        background: COLORS.accentColor,
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

    hr: {
        border: "0",
        borderTop: `3px solid ${COLORS.accentColor}`,
        borderBottom: "1px solid #fff",
        marginBottom: "15px"

    },
    parentHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    close: {
        cursor: "pointer",
        fontSize: "20px",
        '&:hover': {
            color: COLORS.accentColor,
        }
    }
}));




export default function HeaderModal({ titreModal, closeModal, ...props }) {
    const classes = useStyles()
    return (
        <>
            <div className={classes.parentHeader}>
                <Typography variant="h6" className={classes.margin_2}>
                    {titreModal}
                </Typography>
                <AiOutlineCloseCircle className={classes.close} onClick={closeModal} />
            </div>
            <hr className={classes.hr} />
        </>
    )
}