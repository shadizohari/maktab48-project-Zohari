import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CardHorizantal from './CardHorizantal'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import { COLORS } from '../styles/constants';




const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        marginBottom: "20px",
        marginTop: "20px"
    },
    hr: {
        border: "0",
        borderTop: `3px solid ${COLORS.accentColor}`,
        borderBottom: "1px solid #fff",
        marginBottom: "40px",
        marginTop: "40px"


    },
}));

export default function Home({ title, idList, data, ...props }) {
    const classes = useStyles();
    const [featuredBooks, setFeaturedBooks] = useState([])

    useEffect(() => {
        for (let i = 0; i < idList.length; i++) {
            for (let j = 0; j < data.length; j++) {
                if (idList[i] == data[j].id) {
                    featuredBooks.push(data[j])
                }
            }
        }
        setFeaturedBooks([...featuredBooks]);


    }, [idList, data])



    return (

        <Container maxWidth="lg" className={classes.root}>
            <Link to={`category/${title}`}> <Typography variant="h5" className={classes.title} >
                {`دسته ${title}`}
            </Typography>
            </Link>

            <Grid container spacing={3}>
                {featuredBooks.map((item) => {
                    return (
                        <Grid item xs={12} sm={6} md={4}>
                            <Link to ={`product/${item.id}`}><CardHorizantal title={item.name} img={item.img} price={item.price} /></Link>
                        </Grid>
                    )
                })}
            </Grid>
            <hr className={classes.hr} />
        </Container>
    );
}