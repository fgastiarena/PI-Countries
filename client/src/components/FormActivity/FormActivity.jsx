import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import getAllCountries, { getActivities, postActivity } from "../../actions/actions";
import './FormActivity.css';


const validationForm = (input) => {
  let errors = {};
  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;

  if (!input.name.trim()) {
    errors.name = "Name is required";
  }
  if (!regexName.test(input.name.trim())) {
    errors.name = "The name field only accepts letters";
  }
  if (!input.difficulty) {
    errors.difficulty = "Difficulty required";
  }
  if (!input.duration) {
    errors.duration = "Duration required";
  }
  if (!input.season) {
    errors.season = "Season required";
  }
  if (input.countries.length === 0) {
    errors.countries = "Countries or country required";
  }
  return errors;
};

export default function FormActivity() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialState = { 
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [], 
  }
  const [input, setInput] = useState(initialState);
  const [errors, setErrors] = useState({});
  const countries = useSelector((state) => state.countries).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  useEffect(() => {
    dispatch(getAllCountries());
    dispatch(getActivities());
  }, [dispatch]);


  function handleSubmit(e) {
    e.preventDefault();
    setErrors(validationForm(input));
    const errors = validationForm(input);
    if (Object.values(errors).length === 0) {
      dispatch(postActivity(input));
      alert("Activity successfully created!");
      document.formAct.reset();
      setInput(initialState)
    } else {
      alert("Please complete all the entries before creating an activity");
    }
  };

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validationForm({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  function handleSelect(e) {
      e.preventDefault();
      setInput({
        ...input,
        countries: [...input.countries, e.target.value],
      });
      setErrors(
        validationForm({
          ...input,
          countries: [...input.countries, e.target.value],
        })
      );
  }

  const handleDelete = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      countries: input.countries.filter((c) => c !== e.target.name),
    });
    setErrors(
      validationForm({
        ...input,
        countries: input.countries.filter((c) => c !== e.target.name),
      })
    );
  };

  return (
    <>
        <div className="containerForm">
          <form className="form" name="formAct" onSubmit={(e) => handleSubmit(e)}>
            <label className="labelTitle">Create your Activity</label>
        
             {/* -----NAME----- */}
            <div>
            <input
            className="input-form"
              type='text'
              name='name'
              value={input.name}
              placeholder='Activity name..'
              onChange={(e) => handleChange(e)}
            />
            {errors.name && <p className='form-error'>{errors.name}</p>}  
            </div>

            {/* -----DIFFICULTY----- */}

            <div>
            <select className="select-form" name='difficulty' onChange={(e) => handleChange(e)}>
              <option hidden selected> Difficulty </option>
              <option value='1'>Begginer</option>
              <option value='2'>Amateur</option>
              <option value='3'>Normal</option>
              <option value='4'>Professional</option>
              <option value='5'>Expert</option>
            </select>

            {errors.difficulty && (<p className='form-error'>{errors.difficulty}</p>)}
            </div>

              {/* -----DURATION----- */}

            <div>
            <select className="select-form" name="duration"  onChange={ (e) => handleChange(e)}>
                <option hidden selected>Duration</option>
                <option value='1'>1 Hr</option>
                <option value='2'>2 Hrs</option>
                <option value='3'>3 Hrs</option>
                <option value='4'>4 Hrs</option>
                <option value='5'>5 Hrs</option>
            </select>
            {errors.duration && <p className='form-error'>{errors.duration}</p>}
            </div>

            {/* -----SEASON----- */}

            <div>
            <select className="select-form" name='season' onChange={(e) => handleChange(e)}>
              <option hidden selected>Season</option>
              <option value='Summer'>Summer</option>
              <option value='Autumn'>Autumn</option>
              <option value='Winter'>Winter</option>
              <option value='Spring'>Spring</option>
            </select>
            {errors.season && <p className='form-error'>{errors.season}</p>}
            </div>

            {/* -----COUNTRIES----- */}

            <div>
            <select
            className="select-form"
              name='country'
              placeholder='Select Countries'
              onChange={(e) => handleSelect(e)}>
              <option >
                Select Countries
              </option>
              {countries.map((e) => (
                <option key={e.id} value={e.id} name={e.name}>
                  {e.name}
                </option>
              ))}
            </select>
            </div>
            {/* -----COUNTRIES LIST----- */}
            <hr/>

            <div>
            {input.countries.length > 0 && (
              <div className="countries">
                <ul className="countries-list">
                  {input.countries.map((c) => {
                    let name = countries.map((country) =>
                      country.id === c ? country.name : null
                    );
                    return (
                      <li className="country-cont" key={c.id}>
                        <button className='btn-cont' name={c} onClick={(e) => {handleDelete(e)}}>
                          ❌
                        </button>
                        {name}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            {errors.countries && (<p className='form-error'>{errors.countries}</p>)}
            </div>
            
            <div className="buttons">
            <button className="btn-form" type='submit'>
              Create Activity
            </button>
          
            <button
             className="btn-form"
              onClick={(e) => {
                e.preventDefault();
                navigate("/home");
              }}>
              Back to Home
            </button>
            </div>

          </form>
        </div>
    </>
  );
};


