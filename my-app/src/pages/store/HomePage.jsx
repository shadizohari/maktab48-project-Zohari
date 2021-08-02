import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import HomeSection from '../../storeComponents/HomeSection'
import axios from "axios";
import LayoutPage from '../../storeComponents/LayoutPage'
import { Container } from '@material-ui/core';
import baner from '../../assets/img/banner-2.jpg'
const useStyles = makeStyles((theme) => ({
}));

export default function Home() {
    const classes = useStyles();

    const [featured, setFeatured] = useState([])
    const [books, setBooks] = useState([])

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
    const [valueSearch, setValueSearch] = useState()

    return (
        <>
            <LayoutPage searchInput={(e) => setValueSearch(e.target.value)} isSearch="true">
                <Container>
                    <img src={baner} style={{width:"100%",marginTop:'25px'}} />
                </Container>
                {(!valueSearch && featured.length > 0 && books.length > 0) && (featured.map((item) => { return <HomeSection title={item.category} idList={item.products} data={books} search={valueSearch} /> }))}
                {(valueSearch && <HomeSection data={books} search={valueSearch} />)}
            </LayoutPage>
        </>
    );
}
