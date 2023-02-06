import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Logo from './components/Logo.js';
import End from './pages/End.js';
import Home from './pages/Home.js';
import Mode from './pages/Mode.js';
import Play from './pages/Play.js';
import Ready from './pages/Ready.js';
import { global } from './styles/global.js';

const App = () => (
  <BrowserRouter>
    {global}
    <Logo />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ready" element={<Ready />} />
      <Route path="/mode" element={<Mode />} />
      <Route path="/play" element={<Play />} />
      <Route path="/end" element={<End />} />
    </Routes>
  </BrowserRouter>
);

export default App;
