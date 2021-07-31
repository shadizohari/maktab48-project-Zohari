import LayoutPage from '../../storeComponents/LayoutPage'
import React, { useEffect, useState } from 'react';
import LoadingLayout from '../../component/LoadingLayout';
import { Container, Button, Typography } from '@material-ui/core';
import { styleTitle } from '../../styles/styleTitle';
import { RiCloseCircleFill } from "react-icons/ri";
import { makeStyles } from '@material-ui/core/styles';
import { FaCheckCircle } from "react-icons/fa";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    parent: {
        marginTop: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        [theme.breakpoints.down('sm')]: {
            flexDirection: "column",
        }
    },
    icon_dispensing: {
        color: "red",
        fontSize: "150px",

        [theme.breakpoints.down('sm')]: {
            marginBottom: "30px",
            marginRight: "0px",
        }

    },
    icon_success: {
        color: "green",
        fontSize: "150px",
        marginRight: "25px",
        [theme.breakpoints.down('sm')]: {
            marginBottom: "30px",
            marginRight: "0px",

        }

    },
    text: {
        [theme.breakpoints.down('sm')]: {
            textAlign: "center"
        }
    }

}));

function PaymentResultPage(params) {
    const classes = useStyles()
    const [component, setComponent] = useState()
    const classesTitle = styleTitle();
    const history = useHistory();

    useEffect(() => {
        (history.location.pathname.includes("true")?
        setComponent(true):
        setComponent(false)
        )

    }, [])

    return (
        <LoadingLayout>
            <LayoutPage>
                <Container>
                    <Typography variant="h5" className={classesTitle.title} >
                        نتیجه خرید
                    </Typography>
                    <div className={classes.parent}>
                        {component ?
                            (<>
                                <FaCheckCircle className={classes.icon_success} />
                                <Typography variant="h5" className={classes.text}>
                                    با تشکر از خرید شما سفارش شما ثبت شد. <br /> جهت هماهنگی ارسال با شما تماس گرفته خواهد شد.
                                </Typography>
                            </>)
                            : (<>
                                <RiCloseCircleFill className={classes.icon_dispensing} />
                                <Typography variant="h5" className={classes.text}>
                                    پرداخت موفق آمیز نبود.<br /> سفارش شما در انتظار پرداخت است.
                                </Typography>
                            </>)
                        }
                    </div>
                </Container>
            </LayoutPage>
        </LoadingLayout>
    )

}

export default PaymentResultPage