import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Logo from './components/Logo';
import { End, Home, Mode, Play, Ready } from './pages';
import { global } from './styles/global';

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
