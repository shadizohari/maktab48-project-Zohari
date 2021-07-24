import react from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { COLORS } from "../styles/constants";
const useStyles = makeStyles((theme) => ({
    footer: {
        position: "absolute",
        bottom: "0",
        width: "100%",
        height: "150px",
        background: COLORS.primeryColor,

    },
    flex: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
    }


}));
export default function Footer() {
    const classes = useStyles();
    return (
        <div style={{  position: "relative",minHeight: "100vh"}}>
            < div className={classes.footer} >
                <Container className={classes.flex}>
                    <p style={{ color: "white" }}> تمامی حقوق این سایت محفوط است.  </p>
                </Container>
            </div >
        </div>
    )
}