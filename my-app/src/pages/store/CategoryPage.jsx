// import { useEffect, useState } from "react";
// import { useHistory, useParams } from "react-router-dom";
// import CardHorizantal from '../../storeComponents/CardHorizantal'
// import { makeStyles, useTheme } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
// import Container from '@material-ui/core/Container';
// import Typography from '@material-ui/core/Typography';
// import axios from "axios";

// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//     },
//     title: {
//         marginBottom: "20px",
//         marginTop: "20px"
//     },
// }));




// function CategoryPage() {
//     const classes = useStyles();
//     const { title } = useParams();
//     console.log(title)
//     const [data, setData] = useState([])
//     const [category, setCategory] = useState([])

//     useEffect(() => {
//         axios.get('http://localhost:5000/books')
//             .then(response => {
//                 if (response.data) {
//                     setData([...response.data])
//                 } else {
//                     console.log("error")
//                 }
//             })

//     }, [])

//     useEffect(() => {
//         data.forEach((book) => {
//             if (book.category == title) {
//                 category.push(book)
//             }
//         })
//         setCategory([...category])
//     }, [data])


//     return (
//         <>
// <Container maxWidth="lg" className={classes.root}>
//     <Typography variant="h5" className={classes.title} >
//         {`دسته ${title}`}
//     </Typography>


//     <Grid container spacing={3}>
//         {(category.length > 0) ? category.map((item) => {
//             return (
//                 <Grid item xs={12} sm={6} md={4}>
//                     <CardHorizantal title={item.name} img={item.img} price={item.price} />
//                 </Grid>
//             )
//         }) : false}
//     </Grid>
// </Container>

//         </>
//     )

// }

// export default CategoryPage






import react from "react"
import { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import CardHorizantal from '../../storeComponents/CardHorizantal'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import axios from "axios";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { FiMenu } from 'react-icons/fi';
import { COLORS } from "../../styles/constants";
import { FaBookOpen } from 'react-icons/fa';
import LayoutPage from '../../storeComponents/LayoutPage';
import { styleTitle} from '../../styles/styleTitle';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    heigth: {
        background: COLORS.primeryColor,
        heigth: "100vh",
        [theme.breakpoints.up('sm')]: {
            minHeight:"100%",

        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexDirection: "column",
        flexGrow: 1,
        // padding: theme.spacing(3),
    },
    hr: {
        border: "0",
        borderTop: `3px solid ${COLORS.accentColor}`,
        borderBottom: "1px solid #fff",
        marginBottom: "30px",
        marginTop: "30px"
    },
    link: {
        color: "white",
        textDecoration: "none",
        '&:hover': {
            color: COLORS.accentColor,
        }
    },
    icon: {
        color: COLORS.accentColor,
        fontSize: "20px",
        
    },
    paddingSub: {
        paddingLeft: "70px"
    },
    paddingCat: {
        paddingLeft: "15px"
    },
    link_card:{
        textDecoration:"none"
    }

}));

function ResponsiveDrawer(props) {

    const { title } = useParams();
    const [data, setData] = useState([])
    const [category, setCategory] = useState([])

    useEffect(() => {
        setCategory([])
        setData([])
        axios.get('http://localhost:5000/books')
            .then(response => {
                if (response.data) {
                    console.log(data)
                    setData([...response.data])
                } else {
                    console.log("error")
                }
            })
    }, [title])

    useEffect(() => {
        data.forEach((book) => {
            if (book.category == title) {
                category.push(book)
            }
        })
        setCategory([...category])
    }, [data])




    const { window } = props;
    const classes = useStyles();
    const classesTitle = styleTitle();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div className={classes.heigth}>
            <div>
                {/* <div className={classes.toolbar} /> */}
                <List style={{ marginTop: "150px" }}>
                    <Link className={classes.link} to='/category/رمان'><ListItem button>
                        <FaBookOpen className={classes.icon} />
                        <ListItemText primary="رمان" className={classes.paddingCat} />
                    </ListItem></Link>
                    <Link className={classes.link} to='/category/ایرانی/رمان'> <ListItem button>
                        <ListItemText primary="ایرانی" className={classes.paddingSub} />
                    </ListItem>
                    </Link>
                    <Link className={classes.link} to='/category/خارجی/رمان'> <ListItem button divider>
                        <ListItemText primary="خارجی" className={classes.paddingSub} />
                    </ListItem></Link>
                </List>

                <List>
                    <Link className={classes.link} to='/category/کودک'><ListItem button>
                        <FaBookOpen className={classes.icon} />
                        <ListItemText primary="کودک" className={classes.paddingCat} />
                    </ListItem></Link>
                    <Link className={classes.link} to='/category/خردسال/کودک'> <ListItem button>
                        <ListItemText primary="خردسال" className={classes.paddingSub} />
                    </ListItem>
                    </Link>
                    <Link className={classes.link} to='/category/کودک/کودک'> <ListItem button>
                        <ListItemText primary="کودک" className={classes.paddingSub} />
                    </ListItem></Link>
                    <Link className={classes.link} to='/category/نوجوان/کودک'> <ListItem button divider>
                        <ListItemText primary="نوجوان" className={classes.paddingSub} />
                    </ListItem></Link>
                </List>
                <List>
                    <Link className={classes.link} to='/category/تاریخ'><ListItem button>
                        <FaBookOpen className={classes.icon} />
                        <ListItemText primary="تاریخ" className={classes.paddingCat} />
                    </ListItem></Link>
                    <Link className={classes.link} to='/category/ایران/تاریخ'> <ListItem button>
                        <ListItemText primary="ایران" className={classes.paddingSub} />
                    </ListItem>
                    </Link>
                    <Link className={classes.link} to='/category/جهان/تاریخ'> <ListItem button divider>
                        <ListItemText primary="جهان" className={classes.paddingSub} />
                    </ListItem></Link>
                </List>
                <List>
                    <Link className={classes.link} to='/category/روانشناسی'><ListItem button>
                        <FaBookOpen className={classes.icon} />
                        <ListItemText primary="روانشناسی" className={classes.paddingCat} />
                    </ListItem></Link>
                    <Link className={classes.link} to='/category/اسلامی/روانشناسی'> <ListItem button>
                        <ListItemText primary="اسلامی" className={classes.paddingSub} />
                    </ListItem>
                    </Link>
                    <Link className={classes.link} to='/category/مدرن/روانشناسی'> <ListItem button divider>
                        <ListItemText primary="مدرن" className={classes.paddingSub} />
                    </ListItem></Link>
                </List>
            </div >
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            {/* <Header /> */}


            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar} style={{ color: COLORS.primeryColor, background: "white" }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <FiMenu />
                    </IconButton>
                </AppBar>
                <nav className={classes.drawer}>
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation="css">
                        <Drawer
                            container={container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}

                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>

                <main className={classes.content}>
                    <LayoutPage style={{ width: "10%" }}>
                        <Container maxWidth="lg" className={classes.root}>
                            <Typography variant="h5" className={classesTitle.title} >
                                {`دسته ${title}`}
                            </Typography>

                        </Container>

                        <Container maxWidth="lg" className={classes.root}>
                            <Grid container spacing={3}>
                                {(category.length > 0) ? category.map((item) => {
                                    return (
                                        <Grid item xs={12} md={6} lg={4}>
                                            <Link className={classes.link_card} to={`/product/${item.id}`}><CardHorizantal sebCategory={item.subCategory} title={item.name} img={item.img} price={item.price} /></Link>
                                        </Grid>
                                    )
                                }) : false}
                            </Grid>
                        </Container>
                    </LayoutPage >
                </main>
            </div>
        </>
    );
}

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default ResponsiveDrawer;












