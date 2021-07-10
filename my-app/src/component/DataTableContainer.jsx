import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 350,
        background: "white",
        boxshadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)",

    }, flex_center: {
        display: "flex",
        justifyContent: "center",
    },
}));



export default function DataTableContainer({ children,...props }) {
    const classes = useStyles();
    return (
        <Container maxWidth="lg" className={classes.flex_center}>
            <Grid item xs={12}>
                <TableContainer>
                    <Table className={classes.table} boxshadow={3}>
                        {children}
                    </Table>
                </TableContainer>
            </Grid>
        </Container>
    )
}