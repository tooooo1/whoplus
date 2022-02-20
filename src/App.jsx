import React from 'react';
import { NumberMain, NumberEnd } from './components';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { Home, Ready } from "./pages"
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    outline: none;
    box-sizing: border-box;
  }
`;

const App = () => (
  <BrowserRouter>
    <GlobalStyle />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ready" element={<Ready />} />
      <Route path="/end" element={<NumberEnd />} />
      <Route path="/game" element={<NumberMain />} />
    </Routes>
  </BrowserRouter>
);

export default App;
