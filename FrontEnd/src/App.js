import React from "react";
import Navbar from "./Components/Common/Navbar";
import { Route } from "react-router-dom";
import { Router } from "react-router-dom";
import { Routes } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
function App() {
  return (
    <div className="w-screen min-h-screen  flex flex-col font-inter">
      <Navbar/>

      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/login" element={ <Login /> }/>
        <Route path="/signup" element={ <Signup /> }/>
      </Routes>
    </div>
  );
}

export default App;
