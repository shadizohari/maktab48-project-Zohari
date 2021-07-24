import { COLORS, MARGIN } from '../styles/constants';
import Container from '@material-ui/core/Container';
import logo from '../assets/img/logo3-orange.png';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { TiShoppingCart } from "react-icons/ti";
import { RiAdminLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
// 
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { useHistory } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const useStyles = makeStyles((theme) => ({
    logo: {
        width: "100px",
        marginRight: "20px",
        marginTop: MARGIN.margin_1,
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
            marginBottom: MARGIN.margin_2,
        }
    },
    icon: {
        fontSize: "30px",
        display: "flex",
        cursor: "pointer",
        alignItems: "center",
    },
    shopIcon: {
        marginRight: "15px",
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
}));

export default function AdminHeader() {
    const classes = useStyles();
    // 
    const history = useHistory();
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const logOut = () => {
        setOpen(false);
        localStorage.clear();
        history.push("/");
    }


    return (
        <Container maxWidth="lg" >
            <Container maxWidth="lg" className={classes.header_managment_panel}>
                <div className={classes.header_logo_flex}>
                    <NavLink to="/" exact>
                        <img className={classes.logo} src={logo} />
                    </NavLink>
                    <Typography variant="h5" className={classes.margin_titre}>
                        پنل مدیریت فروشگاه
                    </Typography>
                </div>
                <div className={classes.icon} onClick={handleClickOpen}>
                    <RiAdminLine className={classes.shopIcon}/>
                    <TiShoppingCart className={classes.shopIcon} />
                </div>


            </Container>
            <hr className={classes.hr} />
        </Container>
    )
}

