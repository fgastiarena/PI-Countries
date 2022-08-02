import React from 'react';
import './Pagination.css';

export default function Pagination({countriesForRestOfPages, allCountries, pagination, countriesForFirstPage = 9}) {
  const pageNumbers = [];

  for (let i = 1; i < (Math.ceil((allCountries - countriesForFirstPage) / countriesForRestOfPages) + 1) + 1; i++) {    // total de pags que voy a tener
    pageNumbers.push(i);    
  }

  return (
  <nav className='pagination-container'>
      <ul className='ulPag'> 
        {pageNumbers &&
        pageNumbers.map(numberPage => (
          <li className='list-items'  onClick={pagination} key={numberPage} value={numberPage}>
           {numberPage} {/*c/u de las pag que necesito para renderizar todos mis países*/}           
          </li>
        ))}
      </ul>
  </nav>
  )
}
 