import React from "react";
import './Activity.css';


export default function Activity({name, difficulty, duration, season}) {
  return (
    <div>
      <p>Name: {name}</p>
      <p>Difficulty: {difficulty}</p>
      <p>Duration: {duration}</p>
      <p>Season: {season}</p>
    </div>
  )
}
