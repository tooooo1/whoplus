import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Logo from './components/Logo.jsx';
import End from './pages/End.jsx';
import Home from './pages/Home.jsx';
import Mode from './pages/Mode.jsx';
import Play from './pages/Play.jsx';
import Ready from './pages/Ready.jsx';
import { global } from './styles/global.jsx';

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
