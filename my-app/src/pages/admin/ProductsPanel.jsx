import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DataTable from '../../component/DataTable';
import { COLORS } from '../../styles/constants';
import Container from '@material-ui/core/Container';
import logo from '../../assets/img/logo3-orange.png';
import DataTableHeader from '../../component/DataTableHeader';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AddBookModal from '../../component/AddBookModal';
import LoadingLayout from '../../component/LoadingLayout';

// tab material..........
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`wrapped-tabpanel-${index}`}
            aria-labelledby={`wrapped-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
// tab material..........
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

// tab material..........
function a11yProps(index) {
    return {
        id: `wrapped-tab-${index}`,
        'aria-controls': `wrapped-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: COLORS.secondaryColor,
        height: "100vh",
    },
    logo: {
        width: "100px",
        marginRight: "20px",
    },
    header_managment_panel: {
        display: "flex",
        alignItems: "center",
        padding: "10px",
    },
    tab_label: {
        fontSize: "20px",
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal_paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


// function major 
export default function TabsWrappedLabel() {
    // tab material.....
    const [value, setValue] = useState('one');
    // tab materila....
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // modal material.....
    const [open, setOpen] = useState(false);
    // modal material.....
    const handleOpen = () => {
        setOpen(true);
    };
    // modal material.....
    const handleClose = () => {
        setOpen(false);
    };


    const classes = useStyles();




    return (
        <LoadingLayout>
            <div className={classes.root}>
                <Container maxWidth="lg" className={classes.header_managment_panel}>
                    <img className={classes.logo} src={logo} />

                    <Typography variant="h4" >
                        پنل مدیریت فروشگاه
                    </Typography>
                </Container>

                <AppBar position="static" style={{ background: COLORS.primeryColor }} >
                    <Tabs value={value}
                        onChange={handleChange}
                        TabIndicatorProps={{ style: { background: COLORS.accentColor } }}
                        centered
                    >
                        <Tab
                            value="one"
                            label="کالاها"
                            wrapped
                            className={classes.tab_label}
                            {...a11yProps('one')}
                        />
                        <Tab value="two"
                            label="موجودی و قیمت‌ها"
                            className={classes.tab_label}
                            {...a11yProps('two')} />
                        <Tab value="three"
                            label="سفارش‌ها"
                            className={classes.tab_label}
                            {...a11yProps('three')} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index="one">
                    <DataTableHeader titre="مدیریت کالا" textBtn="اضافه کردن کالا" handelClick={handleOpen} />
                    <DataTable />
                    <Modal
                        className={classes.modal}
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={open}>
                            <div className={classes.modal_paper}>
                                <AddBookModal/>

                            </div>
                        </Fade>
                    </Modal>
                </TabPanel>
                <TabPanel value={value} index="two">
                    <DataTableHeader titre="موجودی و قیمت‌ها" textBtn="ذخیره" handelClick={handleOpen} />
                    <Modal
                        className={classes.modal}
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={open}>
                            <div className={classes.modal_paper}>
                                <h2>Transition modal 222222222222</h2>
                                <p>react-transition-group animates me.</p>
                            </div>
                        </Fade>
                    </Modal>
                </TabPanel>
                <TabPanel value={value} index="three">
                    Item Three
                </TabPanel>
            </div>
        </LoadingLayout>

    );
}


