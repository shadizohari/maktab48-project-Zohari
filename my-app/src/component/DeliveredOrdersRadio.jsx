import React from 'react';
import clsx from 'clsx';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import styleRadio from '../styles/styleRadio';
import { useDispatch } from 'react-redux';
import {setDeliveredStatus} from '../store/actions/DeliveredStatus'


function StyledRadio(props) {
    const classes = styleRadio();

    return (
        <Radio
            className={classes.root}
            disableRipple
            color="default"
            checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
            icon={<span className={classes.icon} />}
            {...props}
        />
    );
}

export default function DeliveredOrdersRadio() {
    const classes = styleRadio();
    const dispatch = useDispatch();
    const handleChange = (event) => {
        console.log(event.target.value);
        dispatch(setDeliveredStatus(event.target.value))
    };
    return (
        <FormControl component="fieldset">
            <RadioGroup className={classes.displayFlex} defaultValue="enroute" onChange={handleChange}>
                <FormControlLabel value="enroute" control={<StyledRadio />} label="سفارش‌های در انتظار ارسال" />
                <FormControlLabel value="delivered" control={<StyledRadio />} label="سفارش‌های تحویل شده" />
            </RadioGroup>
        </FormControl>
    );
}
