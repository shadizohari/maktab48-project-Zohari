import { makeStyles } from '@material-ui/core/styles';
import { COLORS } from './constants'
export const styleLinkOrderList = makeStyles((theme) => ({
    link: {
        color: COLORS.accentColor,
        cursor: "pointer",
        textDecoration: "underline",
        '&:hover': {
        textDecoration: "none",
        color: COLORS.primeryColor,
        },
    }
}));

