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
import moment from "moment";
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
    /*
       * 'use-date-picker' 
       */
    const [selectedDate, handleDateChange] = useState(moment());
    return (
        <LayoutPage>
            <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
                <Container>
                    <Typography variant="h5" className={classesTitle.title} >
                        نهایی کردن سبدخرید
                    </Typography>


                    <form onSubmit={(e) => console.log(e)} className={classes.form} noValidate>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <CssTextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="نام"
                                    name="nameUser"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CssTextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="نام خانوادگی"
                                    name="lastNameUser"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CssTextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="آدرس"
                                    name="address"
                                /></Grid>
                            <Grid item xs={12} md={6}>
                                <CssTextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="تلفن همراه"
                                    type="number"
                                    name="phone"
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
                            <Button
                                type="submit"
                                variant="contained"
                                className={classes.margin_3}
                                style={{ background: COLORS.accentColor }}
                                fullWidth
                            >
                                <Typography variant="h6" className={classes.align_center}>
                                    پرداخت
                                </Typography>
                            </Button>
                        </Grid>
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