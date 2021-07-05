import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { COLORS } from '../styles/constantVariables'


const useStyles = makeStyles((theme) => ({
    data_table_header: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "24px",
    },
    accentColor: {
        background: COLORS.accentColor,
    },

}));

export default function DataTableHeader({ titre, textBtn, ...props }) {
    const classes = useStyles();
    return (
        <Container maxWidth="lg" className={classes.data_table_header}>
            <Typography variant="h4" >
                
                {titre}
            </Typography>
            <Button
                variant="contained"
                color={COLORS.accentColor}
                className={classes.accentColor}
            >
                {textBtn}
            </Button>
        </Container>
    )
}