import { checkWebPSupport, load } from '@fepack/image';
import { lazy, Suspense, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';

import { ErrorFallback, Logo } from './components';
import { ROUTES } from './constants';
import { GlobalStyle } from './styles/GlobalStyle';

const Home = lazy(() => import('./pages/Home'));
const Ready = lazy(() => import('./pages/Ready'));
const Mode = lazy(() => import('./pages/Mode'));
const Play = lazy(() => import('./pages/Play'));
const End = lazy(() => import('./pages/End'));

const router = createBrowserRouter([
  { path: ROUTES.HOME, element: <Home /> },
  { path: ROUTES.READY, element: <Ready /> },
  { path: ROUTES.MODE, element: <Mode /> },
  { path: ROUTES.PLAY_DEMENTIA, element: <Play /> },
  { path: ROUTES.PLAY_BRAIN, element: <Play mode="Brain" /> },
  { path: ROUTES.END, element: <End /> },
  { path: '*', element: <Navigate replace to={ROUTES.HOME} /> },
]);

const preloadImages = async () => {
  const isSupportWebP = await checkWebPSupport();
  const ext = isSupportWebP ? 'webp' : 'png';

  load(`images/information_resize.${ext}`);
  load(`images/options_resize.${ext}`);
  load(`images/boxing-gloves_resize.${ext}`);
};

const App = () => {
  useEffect(() => {
    preloadImages();
  }, []);

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        sessionStorage.clear();
      }}
    >
      <GlobalStyle />
      <Logo />
      <Suspense>
        <RouterProvider router={router} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
