import { checkWebPSupport, load } from '@fepack/image';
import { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';

import { ErrorFallback, Loading, Logo } from './components';
import { ROUTES } from './constants';
import { GlobalStyle } from './styles/GlobalStyle';

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    lazy: async () => {
      const { default: Component } = await import('./pages/Home');
      return { Component };
    },
    hydrateFallbackElement: <Loading />,
  },
  {
    path: ROUTES.READY,
    lazy: async () => {
      const { default: Component } = await import('./pages/Ready');
      return { Component };
    },
    hydrateFallbackElement: <Loading />,
  },
  {
    path: ROUTES.MODE,
    lazy: async () => {
      const { default: Component } = await import('./pages/Mode');
      return { Component };
    },
    hydrateFallbackElement: <Loading />,
  },
  {
    path: ROUTES.PLAY_DEMENTIA,
    lazy: async () => {
      const { default: Component } = await import('./pages/Play');
      return { Component };
    },
    hydrateFallbackElement: <Loading />,
  },
  {
    path: ROUTES.PLAY_BRAIN,
    lazy: async () => {
      const { PlayBrain: Component } = await import('./pages/Play');
      return { Component };
    },
    hydrateFallbackElement: <Loading />,
  },
  {
    path: ROUTES.END,
    lazy: async () => {
      const { default: Component } = await import('./pages/End');
      return { Component };
    },
    hydrateFallbackElement: <Loading />,
  },
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
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
};

export default App;
