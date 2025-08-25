import { checkWebPSupport, load } from '@fepack/image';
import { ErrorBoundary } from 'react-error-boundary';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';

import { ErrorFallback, Logo } from './components';
import { ROUTES } from './constants';
import { End, Home, Mode, Play, Ready } from './pages';
import { GlobalStyle } from './styles/GlobalStyle';

const router = createBrowserRouter([
  { path: ROUTES.HOME, element: <Home /> },
  { path: ROUTES.READY, element: <Ready /> },
  { path: ROUTES.MODE, element: <Mode /> },
  { path: ROUTES.PLAY_DEMENTIA, element: <Play /> },
  { path: ROUTES.PLAY_BRAIN, element: <Play mode="Brain" /> },
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
  <ErrorBoundary
    FallbackComponent={ErrorFallback}
    onReset={() => {
      sessionStorage.clear();
    }}
  >
    <GlobalStyle />
    <Logo />
    <RouterProvider router={router} />
  </ErrorBoundary>
);

export default App;
