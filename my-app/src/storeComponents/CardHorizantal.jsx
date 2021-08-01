import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { formatPrice } from '../utils/auth';

// import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
// import PlayArrowIcon from '@material-ui/icons/PlayArrow';
// import SkipNextIcon from '@material-ui/icons/SkipNext';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
},
    details: {
    display: 'flex',
    // flexDirection: 'column',
},
    content: {
    flex: '1 0 auto',
},
    imgCard: {
    margin: "15px",
    width: "20%",
    height: "auto"
}
}));

export default function CardHorizantal({ img, title, price, sebCategory, ...prpos }) {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Card className={classes.root}>
            <div className={classes.details}>
                <Avatar className={classes.imgCard} src={img} />

                <CardContent className={classes.content}>
                    <Typography variant="h6">
                        {title}
                    </Typography>
                    <Typography variant="subtitle1">
                        {sebCategory}
                    </Typography>
                    {(price != "ناموجود") ? <Typography variant="subtitle1" color="textSecondary">
                        {`قیمت:`} {formatPrice(price)} تومان
                    </Typography> :
                        <Typography variant="subtitle1">
                            <p style={{ color: "red" }}>{price}</p>
                        </Typography>}

                </CardContent>


            </div>
            <CardMedia
                className={classes.cover}
                image="/static/images/cards/live-from-space.jpg"
                title="Live from space album cover"
            />
        </Card>
    );
}
