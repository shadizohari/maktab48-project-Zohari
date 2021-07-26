import { makeStyles } from '@material-ui/core/styles';
import { COLORS } from './constants'
export const styleTitle = makeStyles((theme) => ({
    title: {
        marginBottom: "25px",
        marginTop: "25px",
        width:"100%",
        padding:"15px",
        background:COLORS.primeryColor,
        color:"white",
        borderTop:`8px solid ${COLORS.accentColor}`,
        // borderLeft:`8px solid ${COLORS.accentColor}`,
        },
    
}))
