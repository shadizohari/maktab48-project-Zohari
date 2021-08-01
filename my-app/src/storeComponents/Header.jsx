import { COLORS, MARGIN } from '../styles/constants';
import Container from '@material-ui/core/Container';
import logo from '../assets/img/logo3-orange.png';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { TiShoppingCart } from "react-icons/ti";
import { RiAdminLine } from "react-icons/ri";
import { NavLink, useHistory } from "react-router-dom";
// 

import Slide from '@material-ui/core/Slide';
import { Link } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const useStyles = makeStyles((theme) => ({
    logo: {
        width: "100px",
        marginRight: "20px",
        marginTop: MARGIN.margin_2,
        marginBottom: MARGIN.margin_1,


    },
    header_managment_panel: {
        display: "flex",
        // alignItems: "center",
        justifyContent: "space-between",

    },
    header_logo_flex: {
        display: "flex",
        alignItems: "center",
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            alignItems: "flex-start",
            paddingRight: 0,
            // marginTop:"50px",
        },
    },
    icon_home_style: {
        fontSize: "20px",
        color: COLORS.primeryColor,
        '&:hover': {
            color: COLORS.accentColor
        },
    },
    margin_titre: {
        fontWeight: "500",
        [theme.breakpoints.down('sm')]: {
            // marginBottom: MARGIN.margin_2,
        }
    },
    icon: {
        fontSize: "35px",
        display: "flex",
        cursor: "pointer",
        alignItems: "center",
    },
    shopIcon: {
        marginRight: "15px",
        color: COLORS.primeryColor,
        '&:hover': {
            color: COLORS.accentColor,
        }
    },
    btn_exite: {
        width: "50%",
        background: COLORS.secondaryColor,
        "&:hover": {
            background: COLORS.accentColor
        }
    },
    hr: {
        border: "0",
        borderTop: `3px solid ${COLORS.accentColor}`,
        borderBottom: "1px solid #fff",
        marginBottom: "20px",
        marginTop: "20px"


    },
    parent_cartQuantity: {
        position: "absolute",
        bottom: "85%",
        right: "50%",
        background: COLORS.accentColor,
        padding: "2px",
        borderRadius: "50%",
        width: "24px",
        height: "24px",
    },
    cartQuantity: {
        position: "absolute",
        top: "50%",
        right: "50%",
        transform: " translate(50%, -50%)",
        color: "white",
        fontSize: "18px"
    }
}));

export default function AdminHeader() {
    const classes = useStyles();
    const [login, setLogin] = useState(false)
    // const history = useHistory();
    const [cartQuantity, setCartQuantity] = useState(0)

    useEffect(() => {
        let arrayCart = localStorage.getItem("cart")
        if (arrayCart) {
            setCartQuantity(JSON.parse(arrayCart).length)
        }
        if (localStorage.getItem("token")) {
            setLogin(true)
        }
    }, [])

    return (
        // <div style={{ background: "white" }}>
        <Container maxWidth="lg" >
            <Container maxWidth="lg" className={classes.header_managment_panel}>
                <div className={classes.header_logo_flex}>
                    <NavLink to="/" exact>
                        <img className={classes.logo} src={logo} />
                    </NavLink>
                    <Typography variant="h5" className={classes.margin_titre}>
                        فروشگاه کتاب
                    </Typography>
                </div>
                <div className={classes.icon}>
                    {login ? <Link to="/admin-panel/products"><RiAdminLine className={classes.shopIcon} /></Link> :
                        <Link to="/admin-panel"><RiAdminLine className={classes.shopIcon} /></Link>}

                    <Link to="/cart" style={{ position: "relative" }}>
                        <TiShoppingCart className={classes.shopIcon} />
                        {cartQuantity > 0 ?
                            <span className={classes.parent_cartQuantity}>
                                <span className={classes.cartQuantity}>{cartQuantity}</span>
                            </span> : false}
                    </Link>
                </div>


            </Container>
            {/* <hr className={classes.hr} /> */}
        </Container>
        // </div>
    )
}

