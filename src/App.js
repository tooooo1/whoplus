import React from 'react';
import { NumberStart, NumberMain, NumberEnd } from './components';
import { BrowserRouter, Route, Routes } from "react-router-dom";


const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<NumberStart />} />
      <Route path="/end" element={<NumberEnd />} />
      <Route path="/game" element={<NumberMain />} />
    </Routes>
  </BrowserRouter>
);

export default App;
