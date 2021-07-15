import { makeStyles } from '@material-ui/core/styles';
// import{MARGIN} from '../styles/constants'

const style = makeStyles((theme) => ({
    flexData: {
        display: "flex",
    },
    info: {
        paddingTop:"5px",
        paddingBottom:"5px"
    }

}));

export default function InfoList({ subject, info, ...props }) {
    const classes = style()

    return (
        <div className={classes.flexData}>
            <p className={classes.info}>{subject}: &nbsp;</p>
            <p className={classes.info}> {info}</p>

        </div>
    )


}