import React from 'react';
const Pagination = ({userPerPage,totalUser, currentPage, paginate}) => {
    const pageNumbers = [];
    for(let i=1; i <= Math.ceil(totalUser / userPerPage); i++){
        pageNumbers.push(i);
    }
    return(
        <nav>
            <ul className="pagination">
                {/* {pageNumbers.map(number=>(
                <li key={number} className="page-item">
                    <a onClick = {()=>paginate(number)} className="page-link">{number}</a>
                </li>))
                } */}
                <li className="page-item">
                    <button onClick = {()=>paginate(currentPage-1)} className="page-link" disabled={currentPage <= 1}>Previous</button>
                </li>
                 <li className="page-item">
                    <button onClick = {()=>paginate(currentPage)} className="page-link">{currentPage}</button>
                </li>
                <li className="page-item">
                    <button onClick = {()=>paginate(currentPage+1)} className="page-link" disabled={currentPage >= Math.ceil(totalUser / userPerPage)}>next</button>
                </li>
            </ul>
        </nav>
    )
}
export default Pagination;