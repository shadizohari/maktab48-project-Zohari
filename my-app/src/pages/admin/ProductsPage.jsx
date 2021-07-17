import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DataTableProducts from '../../component/DataTableProducts';
import { COLORS, MARGIN } from '../../styles/constants';
// import Container from '@material-ui/core/Container';
import DataTableHeader from '../../component/DataTableHeader';
import LoadingLayout from '../../component/LoadingLayout';
import { useDispatch, useSelector } from 'react-redux';
import AdminHeader from '../../component/AdminHeader';
import { setLoading } from '../../store/actions/isLoading';
import DataTableQuanitityandPrices from '../../component/DataTableQuantity&Price'
import { useHistory } from "react-router-dom";
import DataTableOrders from '../../component/DataTableOrders';
import LayoutAdminPanel from '../../component/LayoutAdminPanel'


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
    tab_label: {
        fontSize: "20px",
    },
    tab: {
        "& .MuiTab-root": {
            paddingTop: "12px",
            paddingBottom: "12px"
        }
    }
}));

// function major 
export default function TabsWrappedLabel() {
    const dispatch = useDispatch();
    const classes = useStyles();
    let history = useHistory();
    // tab material
    const [value, setValue] = useState();
    // path page
    const [pathUrl, setPathUrl] = useState(history.location.pathname);


    useEffect(() => {
        if (pathUrl === "/admin-panel/products") {
            setValue("one")
        } else if (pathUrl === "/admin-panel/quantity_and_price") {
            setValue("two")
        } else if (pathUrl === "/admin-panel/orders") {
            setValue("three")
        }
    }, [])




    // change tab material
    const handleChange = (event, newValue) => {
        setValue(newValue);
        if (newValue === "one") {
            history.push("/admin-panel/products");
        } else if (newValue === "two") {
            history.push("/admin-panel/quantity_and_price");
        } else if (newValue === "three") {
            history.push("/admin-panel/orders");
        }
        // dispatch(setLoading(true));
        // setTimeout(() => {
        //     dispatch(setLoading(false));
        // }, 500);
    };


    return (
        <LoadingLayout>
            <div className={classes.root}>
                <LayoutAdminPanel>
                    <AppBar position="static" style={{ background: COLORS.primeryColor }} >
                        <Tabs value={value}
                            className={classes.tab}
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
                        <DataTableProducts />
                    </TabPanel>

                    <TabPanel value={value} index="two">
                        <DataTableQuanitityandPrices />
                    </TabPanel>

                    <TabPanel value={value} index="three">
                        <DataTableOrders />
                    </TabPanel>
                </LayoutAdminPanel>
            </div>
        </LoadingLayout>

    );
}



// const [rows, setRows] = setState([]);

// useEffect(() => {
//     data.map(item => setRows([...rows, {id: item.id, priceEditable: false, entityEditable: false}]))
// }, [data])

// [
//     {
//         id: 1, priceEditable: false, entityEditable: false
//     },
//     {
//         id: 2, priceEditable: false, entityEditable: false
//     },
//     {
//         id: 3, priceEditable: false, entityEditable: false
//     }
// ]

// const changeEdit = (id) => {
//     let newRows = [...rows];
//     let index = rows.findIndex(r => r.id === id); 