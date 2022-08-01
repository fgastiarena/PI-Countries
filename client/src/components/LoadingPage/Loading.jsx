import React from 'react';
import loading from "../img/loading.gif";
import './Loading.css';

export function Loading({ setLoading }) {

    return (
      <div className='loading-container'>
        <img className="loading-img" src={loading} alt="Loading ..." />
        <div>
          <p>Loading ... just a second please </p>
        </div>
        {setTimeout(() => {
          setLoading(false);
        }, 1000)}
      </div>
    );
    
  }
  