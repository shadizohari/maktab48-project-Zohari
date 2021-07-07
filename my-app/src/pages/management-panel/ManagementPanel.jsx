import React,{useContext} from 'react';
import { ModalContext } from "../../context/modalContext";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DataTable from '../../component/DataTable';
import { COLORS } from '../../styles/constantVariables';
import Container from '@material-ui/core/Container';
import logo from '../../img/logo3-orange.png';
import DataTableHeader from '../../component/DataTableHeader';
import ModalAddBook from '../../component/ModalAddBook';

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
        backgroundColor: COLORS.secondaryColor,
        height:"100vh",
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
}));

export default function TabsWrappedLabel() {
    const classes = useStyles();
    const [value, setValue] = React.useState('one');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const { modal, handleModal, modalContent } = useContext(ModalContext);

    const addBook = () => {
      handleModal(<ModalAddBook/>);
    };




    return (
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
                <DataTableHeader titre="مدیریت کالا" textBtn="اضافه کردن کالا" handelClick={addBook}/>
                <DataTable />
            </TabPanel>
            <TabPanel value={value} index="two">
            <DataTableHeader titre="موجودی و قیمت‌ها" textBtn="ذخیره"/>
            </TabPanel>
            <TabPanel value={value} index="three">
                Item Three
            </TabPanel>
        </div>
    );
}


