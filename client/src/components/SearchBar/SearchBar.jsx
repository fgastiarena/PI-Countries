import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCountriesNames } from '../../actions/actions';

export default function SearchBar() {

    const dispatch = useDispatch();
    const [name, setName] = useState(''); //


    function handleChange(e){
        e.preventDefault();
        setName('');
        setName(e.target.value);  //value del input
    };

    function handleEnter(e){
       if(e.key === 'Enter') handleSubmit(e);
    }

    function handleSubmit(e){
        e.preventDefault();
        if(name.length > 2) {
            dispatch(getCountriesNames(name))
            setName('');
        } else {
            alert('Enter at least three letters');
        } 

        //  if(name !== setName(e.target.value)) {
        //      alert('The entered Country does not exist!');
        // } 
    }

    return (
        <div>
            <input 
                onChange={e => handleChange(e)}
                placeholder='Search Country...' 
                type='text'
                value={name}
                onKeyDown={handleEnter}
            />
            <button
                type='submit'
                onClick={e => handleSubmit(e)}
            >
                Search
            </button>
        </div>
    )
};
