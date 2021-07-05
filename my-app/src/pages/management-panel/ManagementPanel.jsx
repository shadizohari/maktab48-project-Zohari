import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Books from '../../component/Books';
import { COLORS } from '../../styles/constantVariables';
import Grid from '@material-ui/core/Grid';

// import Wares from '../../'

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

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `wrapped-tab-${index}`,
        'aria-controls': `wrapped-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function TabsWrappedLabel() {
    const classes = useStyles();
    const [value, setValue] = React.useState('one');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Grid spacing={3}>
                <Grid item xs={6}>
                    <Typography variant="h5" className={classes.align_center}>
                        پنل مدیریت فروشگاه
             </Typography>
                </Grid>
            </Grid>

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
                        {...a11yProps('one')}
                    />
                    <Tab value="two" label="موجودی و قیمت‌ها" {...a11yProps('two')} />
                    <Tab value="three" label="سفارش‌ها" {...a11yProps('three')} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index="one">
                <Books />
            </TabPanel>
            <TabPanel value={value} index="two">
                Item Two
      </TabPanel>
            <TabPanel value={value} index="three">
                Item Three
      </TabPanel>
        </div>
    );
}


