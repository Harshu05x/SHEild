import React from "react";
import Navbar from "./Components/Common/Navbar";
import { Route } from "react-router-dom";
import { Router } from "react-router-dom";
import { Routes } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import GovernmentSchemes from "./Pages/Post";
import SelfDefense from "./Pages/EducationInfocontain/SelfDefence";
import LegalRights from "./Pages/EducationInfocontain/LegalRights";
import HealthWellness from "./Pages/EducationInfocontain/HealthWellness";
import FinancialIndependence from "./Pages/EducationInfocontain/FinancialIndependence";
import Dashboard from "./Pages/Dashboard";
function App() {
  return (
    <div className="w-screen min-h-screen  flex flex-col font-inter">
      <Navbar/>

      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/login" element={ <Login /> }/>
        <Route path="/signup" element={ <Signup /> }/>
        <Route path='/post' element={<GovernmentSchemes/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path="educational-information/self-defense" element={<SelfDefense />} />
        <Route path="educational-information/legal-rights" element={<LegalRights />} />
        <Route path="educational-information/health-wellness" element={<HealthWellness />} />
        <Route path="educational-information/financial-independence" element={<FinancialIndependence />} />
      </Routes>
    </div>
  );
}

export default App;
