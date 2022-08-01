import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

export default function Nav({setOrder}) {
    const navigate = useNavigate();

    function handleClick(e){
        e.preventDefault();
        navigate('/create');
    }

    return (
        <div>
                <button type='submit' onClick={(e) => handleClick(e)}>Create Activity</button>
            <SearchBar/>
            {/* <button onClick={e => handleClick(e)}>Create Activity</button> */}
        </div>
    )
};
