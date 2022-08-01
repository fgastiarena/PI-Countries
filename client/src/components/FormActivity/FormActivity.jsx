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
  const [input, setInput] = useState({ //lo que necesita mi post
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [], //para cargar más de un país
  });
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
        <div>
          <form name="formAct" onSubmit={(e) => handleSubmit(e)}>
            <label>Create your Activity</label>
        
             {/* -----NAME----- */}
            <div>
            <input
              type='text'
              name='name'
              value={input.name}
              placeholder='Activity name..'
              onChange={(e) => handleChange(e)}
            />
            {errors.name && <p style={{color:"red"}}>{errors.name}</p>}  
            </div>

            {/* -----DIFFICULTY----- */}

            <div>
            <select name='difficulty' onChange={(e) => handleChange(e)}>
              <option hidden selected> Difficulty </option>
              <option value='1'>Begginer</option>
              <option value='2'>Amateur</option>
              <option value='3'>Normal</option>
              <option value='4'>Professional</option>
              <option value='5'>Expert</option>
            </select>

            {errors.difficulty && (<p style={{color:"red"}}>{errors.difficulty}</p>)}
            </div>

              {/* -----DURATION----- */}

            <div>
            <select name="duration"  onChange={ (e) => handleChange(e)}>
                <option hidden selected>Duration</option>
                <option value='1'>1 Hr</option>
                <option value='2'>2 Hrs</option>
                <option value='3'>3 Hrs</option>
                <option value='4'>4 Hrs</option>
                <option value='5'>5 Hrs</option>
            </select>
            {errors.duration && <p style={{color:"red"}}>{errors.duration}</p>}
            </div>

            {/* -----SEASON----- */}

            <div>
            <select name='season' onChange={(e) => handleChange(e)}>
              <option hidden selected>Season</option>
              <option value='Summer'>Summer</option>
              <option value='Autumn'>Autumn</option>
              <option value='Winter'>Winter</option>
              <option value='Spring'>Spring</option>
            </select>
            {errors.season && <p style={{color:"red"}}>{errors.season}</p>}
            </div>

            {/* -----COUNTRIES----- */}

            <div>
            <select
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
            
            <div>
            {input.countries.length > 0 && (
              <div>
                <h3>Selected Countries</h3>
                <hr/>
                <ul className="countries-list">
                  {input.countries.map((c) => {
                    let name = countries.map((country) =>
                      country.id === c ? country.name : null
                    );
                    return (
                      <li key={c.id}>
                        <button name={c} onClick={(e) => {handleDelete(e)}}>
                          ❌
                        </button>
                        {name}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            {errors.countries && (<p style={{color:"red"}}>{errors.countries}</p>)}
            </div>

            <button type='submit'>
              Create Activity
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                navigate("/home");
              }}>
              Back to Home
            </button>

          </form>
        </div>
    </>
  );
};


