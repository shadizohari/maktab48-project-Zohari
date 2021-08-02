import React from 'react';
import Header from './Header';
import Footer from './Footer';

export default function LayoutPage({ children,classHeader, ...props }) {
    return (
        <div>
            <Header classHeader={classHeader}/>
            {children}
            <Footer/>
        </div>
    );
}