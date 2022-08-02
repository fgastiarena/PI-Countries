import React from 'react';
import loading2 from '../img/loading2.gif';
import './Loading.css';

export function Loading() {

    return (
      <div className='loading-container'>
        <img className="loading-img" src={loading2} alt="Loading ..." />
        <div>
          <p>Loading ... just a second please </p>
        </div>
      </div>
    );
    
  }
  