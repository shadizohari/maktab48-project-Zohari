import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import { BiSearchAlt } from 'react-icons/bi';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '0px 0px',
        display: 'flex',
        alignItems: 'center',
        width: 200,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    customInputSearch: {
        "& .MuiInputBase-input": {
            padding: "0px",
        }
    },

}));

export default function CustomizedInputBase({searchInput,searchresHomePage,...props}) {
    const classes = useStyles();

    return (

        <Paper component="form" className={classes.root} className={`${searchresHomePage}`}>
            <IconButton type="submit" className={classes.iconButton, classes.customInputSearch} aria-label="search">
                <BiSearchAlt />
            </IconButton>
            <InputBase
                className={classes.input}
                placeholder="جستجو ..."
                onChange={searchInput}
            />

        </Paper>
    );
}