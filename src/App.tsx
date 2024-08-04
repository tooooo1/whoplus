import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

import { Logo } from './components';
import { ROUTES } from './constants';
import { End, Home, Mode, Play, Ready } from './pages';
import { GlobalStyle } from './styles/GlobalStyle';
import { load, checkWebPSupport } from '@fepack/image';

const router = createBrowserRouter([
  { path: ROUTES.HOME, element: <Home /> },
  { path: ROUTES.READY, element: <Ready /> },
  { path: ROUTES.MODE, element: <Mode /> },
  { path: ROUTES.PLAY, element: <Play /> },
  { path: ROUTES.END, element: <End /> },
  { path: '*', element: <Navigate replace to={ROUTES.HOME} /> },
]);

const checkWebPSupportAndLoad = async () => {
  const isSupportWebP = await checkWebPSupport();

  if (isSupportWebP) {
    load('images/information_resize.webp');
    load('images/options_resize.webp');
    load('images/boxing-gloves_resize.webp');
  } else {
    load('images/information_resize.png');
    load('images/options_resize.png');
    load('images/boxing-gloves_resize.png');
  }
};

checkWebPSupportAndLoad();

const App = () => (
  <>
    <GlobalStyle />
    <Logo />
    <RouterProvider router={router} />
  </>
);

export default App;
