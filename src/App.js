import React from 'react';
import { NumberMain, NumberEnd } from './components';
import { BrowserRouter, Route, Routes } from "react-router-dom";


const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<NumberMain />} />
      <Route path="/end" element={<NumberEnd />} />
    </Routes>
  </BrowserRouter>
);

export default App;
