import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import Logo from './components/Logo.jsx';
import Home from './pages/Home.jsx';
import Ready from './pages/Ready.jsx';

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    outline: none;
    box-sizing: border-box;
  }
  body > div {
    background-color: #f2f2f2;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const App = () => (
  <BrowserRouter>
    <GlobalStyle />
    <Logo />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ready" element={<Ready />} />
      {/* <Route path="/end" element={<End />} />
      <Route path="/play" element={<Play />} />
      <Route path="/mode" element={<Mode />} /> */}
    </Routes>
  </BrowserRouter>
);

export default App;
