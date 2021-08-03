import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CardHorizantal from './CardHorizantal'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import { COLORS } from '../styles/constants';
import { styleTitle } from '../styles/styleTitle';
import { MdDoNotDisturbAlt } from 'react-icons/md';


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
    link: {
        textDecoration: "none",
    },
    notFound: {
        marginTop: "50px",
        color: COLORS.primeryColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
}));

export default function Home({ title, idList, data, search, ...props }) {
    const classes = useStyles();
    const [featuredBooks, setFeaturedBooks] = useState([]);
    const classesTitle = styleTitle();

    useEffect(() => {
        for (let i = 0; i < idList?.length; i++) {
            for (let j = 0; j < data.length; j++) {
                if (idList[i] == data[j].id) {
                    featuredBooks.push(data[j])
                }
            }
        }
        setFeaturedBooks([...featuredBooks]);


    }, [idList, data])
    const searchFunc = function (array) {
        return array.filter((book) => { return (book.name.includes(search)) });
    }
    const [dataSearch, setDataSearch] = useState()
    useEffect(() => {
        setDataSearch(searchFunc(data))
    }, [search, data])


    return (

        <Container maxWidth="lg" className={classes.root}>
            {!search ?
                <>
                    <Link className={classes.link} to={`category/${title}`}> <Typography variant="h5" className={classesTitle.title} >
                        {`دسته ${title}`}

                    </Typography>
                    </Link>

                    <Grid container spacing={3}>
                        {featuredBooks.map((item, index) => {
                            return (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Link className={classes.link} to={`product/${item.id}`}>
                                        {item.quantity > 0 ?
                                            <CardHorizantal title={item.name} img={item.img} price={item.price} /> :
                                            <CardHorizantal title={item.name} img={item.img} price="ناموجود" />
                                            // false
                                        }
                                    </Link>
                                </Grid>
                            )
                        })}
                    </Grid>
                </> :
                <>
                    <Grid container spacing={3} style={{marginTop:"25px"}}>
                        {dataSearch?.length > 0 && dataSearch.map((item, index) => {
                            return (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Link className={classes.link} to={`product/${item.id}`}>
                                        {item.quantity > 0 ?
                                            <CardHorizantal title={item.name} img={item.img} price={item.price} /> :
                                            <CardHorizantal title={item.name} img={item.img} price="ناموجود" />
                                        }
                                    </Link>
                                </Grid>
                            )
                        })
                        }
                    </Grid>

                    {dataSearch?.length < 1 && <Typography align="center" variant="h5" className={classes.notFound}>
                        <MdDoNotDisturbAlt style={{ color: COLORS.accentColor }} />کالایی یافت نشد.
                    </Typography>}
                </>
            }

        </Container >

    );
}