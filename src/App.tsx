import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

import { Logo } from './components';
import { ROUTES } from './constants';
import { End, Home, Mode, Play, Ready } from './pages';
import { GlobalStyle } from './styles/GlobalStyle';

const router = createBrowserRouter([
  { path: ROUTES.HOME, element: <Home /> },
  { path: ROUTES.READY, element: <Ready /> },
  { path: ROUTES.MODE, element: <Mode /> },
  { path: ROUTES.PLAY, element: <Play /> },
  { path: ROUTES.END, element: <End /> },
  { path: '*', element: <Navigate replace to={ROUTES.HOME} /> },
]);

const App = () => (
  <>
    <GlobalStyle />
    <Logo />
    <RouterProvider router={router} />
  </>
);

export default App;
