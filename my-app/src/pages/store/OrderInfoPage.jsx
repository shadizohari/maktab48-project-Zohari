import LayoutPage from '../../storeComponents/LayoutPage'
import { Container, Button, Typography } from '@material-ui/core';
import { styleTitle } from '../../styles/styleTitle';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
// import moment jalali 
import * as moment from 'jalali-moment';
// react-modern-calendar-datepickern
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";
import { utils } from 'react-modern-calendar-datepicker';


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
    datePicker: {
        '& .DatePicker__input': {
            padding: "100px"
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
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [address, setAddress] = useState()
    const [phone, setPhone] = useState()
    // 'use-date-picker' 
    const [selectedDay, setSelectedDay] = useState(null);

    // min and max for select date
    const [todayMoment, setTodayMoment] = useState(moment())
    const [maximumDate, setMaximumDate] = useState()
    useEffect(() => {
        console.log(utils('fa').getToday())
        const array = todayMoment.add(15, 'day').local('fa').format('jYYYY/jM/jD').split("/")
        setMaximumDate({ year: Number(array[0]), month: Number(array[1]), day: Number(array[2]) })
    }, [todayMoment])
    const renderCustomInput = ({ ref }) => (
        <input
            readOnly
            ref={ref} // necessary
            placeholder="تاریخ تحویل کالا را انتخاب کنید" 
            // value={selectedDay}

            value={selectedDay ? ` ${selectedDay.year}/${selectedDay.month}/${selectedDay.day}` : ''}
            style={{
                textAlign: 'center',
                padding: '.8rem',
                fontSize: '1rem',
                border: `1px solid ${COLORS.accentColor}`,
                border:"none",
                // borderRadius: '100px',
                color: COLORS.accentColor,
                outline: 'none',
            }}
            className="my-custom-input-class" // a styling class
        />
    )



    function checkMobile(value) {
        let regularNumber = /(\+98|0)?9\d{9}$/;
        return String(value).match(regularNumber);
    }
    function orderInfo(e) {
        e.preventDefault();
        if (selectedDay && firstName && lastName && address && phone) {
            if (checkMobile(phone)) {
                localStorage.setItem("infoCart", JSON.stringify({
                    "userName": `${firstName} ${lastName}`,
                    "mobile": phone,
                    "address": address,
                    "status": "enroute",
                    "orderTime": moment().locale('fa').format('YYYY/M/D'),
                    "selectedDeliveryTime": moment(`${selectedDay.year}/${selectedDay.month}/${selectedDay.day}`, 'jYYYY/jM/jD').locale('fa').format('YYYY/M/D'), //selectedDate.locale('fa').format('jYYYY/jM/jD'),
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
        } else if (!selectedDay) {
            toast.error("!تاریخ تحویل کالا را مشخص کنید")
        }


    }
    return (
        <LayoutPage>
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
                                    renderInput={renderCustomInput}
                                    value={selectedDay}
                                    inputPlaceholder="تاریخ تحویل کالا را انتخاب کنید" // placeholder
                                    minimumDate={utils('fa').getToday()}
                                    maximumDate={maximumDate}
                                    onChange={setSelectedDay}
                                    shouldHighlightWeekends
                                    locale="fa" // add this
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
        </LayoutPage>
    )
}

export default OrderInfoPage

