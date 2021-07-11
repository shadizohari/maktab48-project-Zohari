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
}));

// function major 
export default function TabsWrappedLabel() {
    // const dispatch = useDispatch();
    const classes = useStyles();

    // tab material.....
    const [value, setValue] = useState('one');
    // tab materila....
    const handleChange = (event, newValue) => {
        setValue(newValue);
        // dispatch(setLoading(true));
        // setTimeout(() => {
        //     dispatch(setLoading(false));
        // }, 500);
    };

   
    return (
        <LoadingLayout>
            <div className={classes.root}>
                <AdminHeader />

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
                    <DataTableProducts />
                </TabPanel>

                <TabPanel value={value} index="two">
                    <DataTableQuanitityandPrices />
                </TabPanel>

                <TabPanel value={value} index="three">
                    Item Three
                </TabPanel>
            </div>
        </LoadingLayout>

    );
}
