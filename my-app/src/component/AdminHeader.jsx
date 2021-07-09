import { COLORS, MARGIN } from '../styles/constants';
import Container from '@material-ui/core/Container';
import logo from '../assets/img/logo3-orange.png';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { ImHome } from "react-icons/im";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    logo: {
        width: "100px",
        marginRight: "20px",
    },
    header_managment_panel: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "5px",
    },
    header_logo_flex: {
        display: "flex",
        alignItems: "center",
    },
    icon_home_style: {
        fontSize: "30px",
        color: COLORS.primeryColor,
    }
}));

export default function AdminHeader() {
    const classes = useStyles();




    return (
        <Container maxWidth="lg" className={classes.header_managment_panel}>
            <div className={classes.header_logo_flex}>
                <img className={classes.logo} src={logo} />
                <Typography variant="h4" >
                    پنل مدیریت فروشگاه
                </Typography>
            </div>
            <NavLink to="/" exact>
                <ImHome className={classes.icon_home_style} />
            </NavLink>
        </Container>
    )
}