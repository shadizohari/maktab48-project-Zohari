import { COLORS } from './constants';
import { makeStyles } from '@material-ui/core/styles';


export const  styleButton = makeStyles((theme) => ({
    btn: {
        background: COLORS.accentColor,
        color: "white",
        '&:hover': {
            color: COLORS.primeryColor,
        }
    },



}));
