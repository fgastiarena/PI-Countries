import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  const navigate = useNavigate();

  function handleClick(e) {
      e.preventDefault();
      navigate('/home');
  }

  return (
    <div className="container-img">
      <div className="title-container">
        <h1 className="title"> Welcome to Countries App</h1>
          <button className="btn-landing" onClick={e => {handleClick(e)}}>Home</button> {/**/}
      </div>
    </div>
  );
}
