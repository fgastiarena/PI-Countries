import "./App.css";
import { Route, Routes} from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import CountryDetail from "./components/CountriesCards/CountryDetail/CountryDetail";
import FormActivity from "./components/FormActivity/FormActivity";

function App() {
  return (
    <div className="App">
      <Routes>
          <Route exact path="/" element={<LandingPage/>}/>
          <Route exact path="/home" element={<Home/>}/>
          <Route exact path="/countries/:id" element={<CountryDetail/>}/>
        <Route exact path="/create" element={<FormActivity/>} />
      </Routes>
    </div>
  );
}

export default App;
