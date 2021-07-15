import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { COLORS } from '../styles/constants'
import DeliveredOrdersRadio from './DeliveredOrdersRadio'

const useStyles = makeStyles((theme) => ({
    data_table_header: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "24px",
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            alignItems: "flex-start",
        },
    },
    accentColor: {
        background: COLORS.accentColor,
    },
    marginTop: {

        [theme.breakpoints.down('sm')]: {
            marginTop: "30px"
        },
    }

}));

export default function DataTableHeader({ titre, textBtn, handelClick, button = true, radio = false, ...props }) {
    const classes = useStyles();
    return (
        <Container maxWidth="lg" className={classes.data_table_header}>
            <Typography variant="h4" >

                {titre}
            </Typography>
            <div className={classes.marginTop}>
                {button ? <Button
                    variant="contained"
                    color={COLORS.accentColor}
                    className={classes.accentColor}
                    onClick={handelClick}
                >
                    {textBtn}
                </Button> : false}
                {radio ? <DeliveredOrdersRadio /> : false}
            </div>

        </Container>
    )
}