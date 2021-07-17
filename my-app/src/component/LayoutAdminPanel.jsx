import React from 'react';
import AdminHeader from './AdminHeader';

export default function LayoutAdminPanel({ children, ...props }) {
    return (
        <>
        <AdminHeader/>
            {children}
        </>
    );
}