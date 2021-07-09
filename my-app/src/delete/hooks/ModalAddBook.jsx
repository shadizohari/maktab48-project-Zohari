import react, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

import { COLORS } from '../styles/constantVariables';
import { makeStyles, withStyles } from '@material-ui/core/styles';


// import Container from '@material-ui/core/Container';
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
    accentColor: {
        background: COLORS.accentColor,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    select: {
        '&:before': {
            borderColor: COLORS.accentColor,
        },
        '&:after': {
            borderColor: COLORS.accentColor,
        }
    },

}));
export default function ModalAddBook() {
    const classes = useStyles();

    return (
        <div>
            <Typography variant="h6">
                افزودن / ویرایش کالا
            </Typography>
            <form noValidate>
                <CssTextField
                    margin="normal"
                    required
                    fullWidth
                    label="نام کتاب"
                    autoFocus
                // value={user}
                // onChange={(e) => setUser(e.target.value)}
                />
                <FormControl style={{ width: "100%" }}>
                    <InputLabel style={{ color: COLORS.accentColor }}>دسته‌بندی</InputLabel>
                    <Select
                        native
                        className={classes.select}
                    // onChange={filter}
                    >
                        <option value="رمان">رمان</option>
                        <option value="کودک">کودک</option>
                        <option value="تاریخی">تاریخی</option>
                        <option value="روانشناسی">روانشناسی</option>
                        <option value="غیره">غیره</option>


                    </Select>
                </FormControl>
                <Button
                    type="submit"
                    variant="contained"
                    // className={classes.submit}
                    fullWidth
                >
                    <Typography variant="h6">
                        ورود
                    </Typography>
                </Button>
            </form>
        </div>
    )
}