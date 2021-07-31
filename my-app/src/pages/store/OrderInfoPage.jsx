import LayoutPage from '../../storeComponents/LayoutPage'
import { Container, Button, Typography } from '@material-ui/core';
import { styleTitle } from '../../styles/styleTitle';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
// import { setTokenAdmin } from '../../store/actions/tokenAdmin';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LoadingLayout from '../../component/LoadingLayout';
import { COLORS, MARGIN } from '../../styles/constants';
import { ToastContainer, toast } from 'react-toastify';
import { setLoading } from '../../store/actions/isLoading';
// 
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
// 
import * as moment from 'jalali-moment';
// 
// import moment from "moment";
import jMoment from "moment-jalaali";
import JalaliUtils from "@date-io/jalaali";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });
// 

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: COLORS.accentColor,
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: COLORS.accentColor,
        },
    },
})(TextField);
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingTop: theme.spacing(13),
        backgroundColor: COLORS.primeryColor,
    },
    paper: {
        padding: theme.spacing(8, 4),
    },
    dataPicker: {
        '& .MuiTypography-h4 ': {
            fontSize: "10px"
        }
    }

}));

const defaultMaterialTheme = createMuiTheme({
    palette: {
        primary: {
            main: COLORS.primeryColor
        }
    }
});
function OrderInfoPage(params) {
    const classesTitle = styleTitle()
    const classes = useStyles()
    const history = useHistory()
    // 'use-date-picker' 
    const [selectedDate, handleDateChange] = useState();

    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [address, setAddress] = useState()
    const [phone, setPhone] = useState()

    function checkMobile(value) {
        let regularNumber = /(\+98|0)?9\d{9}$/;
        return String(value).match(regularNumber);
    }
    function orderInfo(e) {
        e.preventDefault();
        if (selectedDate && firstName && lastName && address && phone) {
            if (checkMobile(phone)) {
                localStorage.setItem("infoCart", JSON.stringify({
                    "userName": `${firstName} ${lastName}`,
                    "mobile": phone,
                    "address": address,
                    "status": "enroute",
                    "orderTime": moment().locale('fa').format('YYYY/M/D'),
                    "selectedDeliveryTime": selectedDate.locale('fa').format('YYYY/M/D'),
                    "actualDeliveryTime": "",
                    "orderList": JSON.parse(localStorage.getItem("cart"))
                }))
                history.push("/shaparak.ir")
            } else {
                toast.error("!شماره موبایل معتبر نیست")
            }
        } else if (!firstName) {
            toast.error("!پر کردن نام الزامی است")
        } else if (!lastName) {
            toast.error("!پر کردن نام خانوادگی الزامی است")
        } else if (!address) {
            toast.error("!پر کردن آدرس الزامی است")
        } else if (!phone) {
            toast.error("!پر کردن موبایل الزامی است")
        } else if (!selectedDate) {
            toast.error("!تاریخ تحویل کالا را مشخص کنید")
        }


    }
    return (
        <LayoutPage>
            <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
                <Container>
                    <Typography variant="h5" className={classesTitle.title} >
                        نهایی کردن سبدخرید
                    </Typography>


                    <form onSubmit={(e) => orderInfo(e)} className={classes.form} noValidate>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <CssTextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="نام"
                                    value={firstName}
                                    name="nameUser"
                                    autoFocus
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CssTextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="نام خانوادگی"
                                    value={lastName}
                                    name="lastNameUser"
                                    onChange={(e) => setLastName(e.target.value)}

                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CssTextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="آدرس"
                                    name="address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                /></Grid>
                            <Grid item xs={12} md={6}>
                                <CssTextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="تلفن همراه"
                                    value={phone}
                                    type="number"
                                    name="phone"
                                    onChange={(e) => setPhone(e.target.value)}
                                /></Grid>
                            <Grid item xs={12} md={6}>
                                <ThemeProvider theme={defaultMaterialTheme}>
                                    <DatePicker
                                        className={classes.dataPicker}
                                        clearable
                                        inputVariant="outlined"
                                        okLabel="تأیید"
                                        cancelLabel="لغو"
                                        clearLabel="پاک کردن"
                                        labelFunc={date => (date ? date.format("jYYYY/jMM/jDD") : "")}
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                    />
                                </ThemeProvider>
                            </Grid>

                        </Grid>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Grid item xs={12} md={2}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    style={{ background: COLORS.green, color: "white", marginTop: "30px" }}
                                    fullWidth

                                >
                                    <Typography variant="h6" className={classes.align_center}>
                                        پرداخت
                                    </Typography>
                                </Button>
                            </Grid>
                        </div>
                        <ToastContainer />
                    </form>







                </Container>
            </MuiPickersUtilsProvider>
        </LayoutPage>
    )
}

export default OrderInfoPage


// import * as React from 'react';
// import TextField from '@material-ui/core/TextField';
// import AdapterJalali from '@date-io/date-fns-jalali';
// import DatePicker from '@material-ui/lab/DatePicker';
// import LocalizationProvider from '@material-ui/lab/LocalizationProvider';

// export default function LocalizedDatePicker() {
//   const [value, setValue] = React.useState(new Date());

//   return (
//     <LocalizationProvider dateAdapter={AdapterJalali}>
//       <DatePicker
//         mask="____/__/__"
//         value={value}
//         onChange={(newValue) => setValue(newValue)}
//         renderInput={(params) => <TextField {...params} />}
//       />
//     </LocalizationProvider>
//   );
// }