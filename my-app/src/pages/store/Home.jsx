import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import HomeSection from '../../storeComponents/HomeSection'
import axios from "axios";

const useStyles = makeStyles((theme) => ({
}));

export default function Home() {
    const classes = useStyles();

    const [featured, setFeatured] = useState([])
    const [books, setBooks] = useState([])
    // const [favouriteFirst, setFavouriteFirst] = useState()

    useEffect(() => {
        axios.get('http://localhost:5000/featured')
            .then(response => {
                if (response.data) {
                    setFeatured([...response.data])
                }
            })

        axios.get('http://localhost:5000/Books')
            .then(response => {
                if (response.data) {
                    setBooks([...response.data])
                }
            })



    }, [])

    return (
        <>
            {(featured.length > 0 && books.length>0) ? featured.map((item) => { return <HomeSection title={item.category} idList={item.products} data={books} /> }) : false}
        </>
    );
}
