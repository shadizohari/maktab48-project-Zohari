import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { COLORS } from '../../styles/constants';
import {MdAndroid} from 'react-icons/md';

const useStyles = makeStyles((theme) => ({
    parent_notFound: {
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
}));

function NotFoundPage() {
    const classes = useStyles()
    return (
        <div className={classes.parent_notFound}>
            <Typography variant="h2" style={{color:COLORS.accentColor}} >
              
                Oops! Page Not Found <MdAndroid/><hr style={{height:"8px", background:COLORS.primeryColor}}/>

            </Typography>
           
        </div>)
}
export default NotFoundPage