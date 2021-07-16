
import React from 'react';
import { useState } from "react";




export const usePagination = (pageNumber) => {
    // table pagenation


    function changePage(num) {
        setStart((num - 1) * pageNumber);
        setEnd(num * pageNumber);
        setActivePageNumber(num);
    }


    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(pageNumber)
    const [activePageNumber, setActivePageNumber] = useState(1);





    return ({ start, end, changePage, activePageNumber, setStart, setEnd, setActivePageNumber })
}


