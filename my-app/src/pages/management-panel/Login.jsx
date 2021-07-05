
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { setTokenAdmin } from '../../store/actions/tokenAdmin';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { ApiLogin } from '../../api/Api'
import LayoutLoading from '../../component/LayoutLoading';
import { COLORS } from '../../styles/constantVariables';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setLoading } from '../../store/actions/isLoading';
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
        paddingTop: theme.spacing(13),
        height: '100vh',
        backgroundColor: COLORS.primeryColor,
    },
    center_flex: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    paper: {
        padding: theme.spacing(8, 4),
    },
    submit: {
        margin: theme.spacing(4, 0),
        padding: theme.spacing(1.5, 0),
        backgroundColor: COLORS.accentColor,
    },
    align_center: {
        textAlign: 'center',
    },
}));

export default function Login() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [res, setRes] = useState(null);
    const history = useHistory();
    const isLoading = useSelector((store) => store.isLoading);


    function formSubmitted(e) {
        e.preventDefault();
        if (user && password) {
            localStorage.clear();
            setRes(ApiLogin('post', 'https://fakestoreapi.com/auth/login', user, password))
            dispatch(setLoading(true));
        }
    }
    useEffect(() => {
        if (res) {
            res.then((x) => {
                console.log(res);
                if (x.data && x.data.status === "Error") {
                    toast.error("request failed!");

                } else if (x.data && x.data.token) {
                    console.log(x.data.token)
                    localStorage.setItem("token", x.data.token);
                    history.push("/Admin-panel/Ware-Management");
                } else if (!x.data) {
                    toast.error("request failed!");
                }
                dispatch(setLoading(false));
            })

        }
    }, [res])
    // .......................................................
    // {status: "Error", msg: "username or password is incorrect"}
    // {token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"}
    return (
        <LayoutLoading>
            <div className={classes.root}>
                <Grid container component="main" className={classes.center_flex}>
                    <Grid item xs={11} sm={8} md={5} component={Paper} elevation={6} square>
                        <div className={classes.paper}>
                            <Typography variant="h5" className={classes.align_center}>
                                ورود به پنل مدیریت فروشگاه
                         </Typography>
                            <form onSubmit={(e) => formSubmitted(e)} className={classes.form} noValidate>
                                <CssTextField
                                    // variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="user"
                                    label="نام کاربری"
                                    name="user"
                                    autoFocus
                                    value={user}
                                    onChange={(e) => setUser(e.target.value)}
                                />
                                <CssTextField
                                    // variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="رمز عبور"
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    className={classes.submit}
                                    fullWidth
                                >
                                    <Typography variant="h6" className={classes.align_center}>
                                        ورود
                                    </Typography>
                                </Button>
                            </form>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <ToastContainer />
        </LayoutLoading>
    );
}
