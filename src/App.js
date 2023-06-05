import React, { Fragment, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Home} from './components/Home/Home.js';
import {SigninComponent} from './components/form/signin'
import {SignupComponent} from './components/form/signup'
import './App.css'
function App() {
  return (
    <BrowserRouter >
      <Routes>
        <Route path="/signin" element={<SigninComponent />} />
        <Route path="/signup" element={<SignupComponent />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
