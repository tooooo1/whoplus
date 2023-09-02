import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Logo } from './components';
import { ROUTES } from './constants';
import { End, Home, Mode, Play, Ready } from './pages';
import { global } from './styles/global';

const App = () => (
  <BrowserRouter>
    {global}
    <Logo />
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.READY} element={<Ready />} />
      <Route path={ROUTES.MODE} element={<Mode />} />
      <Route path={ROUTES.PLAY} element={<Play />} />
      <Route path={ROUTES.END} element={<End />} />
    </Routes>
  </BrowserRouter>
);

export default App;
