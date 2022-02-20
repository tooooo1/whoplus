import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { Home, Ready, Play, End } from "./pages"
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
      <Route path="/end" element={<End />} />
      <Route path="/play" element={<Play />} />
    </Routes>
  </BrowserRouter>
);

export default App;
