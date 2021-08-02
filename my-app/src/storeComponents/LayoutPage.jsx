import React from 'react';
import Header from './Header';
import Footer from './Footer';

export default function LayoutPage({ children,classHeader,searchInput,isSearch, ...props }) {
    return (
        <div>
            <Header classHeader={classHeader} searchInput={searchInput} isSearch={isSearch}/>
            {children}
            <Footer/>
        </div>
    );
}