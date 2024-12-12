import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';

import './index.css';

import ProtectedRoute from './components/ProtectedRoute.tsx';
import App from './App.tsx';
import LoginForm from './pages/LoginForm/LoginForm.tsx';
import PeoplePage from './pages/PeoplePage/PeoplePage.tsx';
import PlanetsPage from './pages/PlanetsPage/PlanetsPage.tsx';
import StarshipsPage from './pages/StarshipsPage/StarshipsPage.tsx';
import AboutEntity from './pages/AboutEntity/AboutEntity.tsx';

const router = createBrowserRouter([
  {
    path: '*',
    element: <h1>Not Found</h1>,
  },
  {
    path: '/login',
    element: <LoginForm />,
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <App />,
        children: [
          {
            path: 'people',
            element: <PeoplePage />,
          },
          {
            path: 'planets',
            element: <PlanetsPage />,
          },
          {
            path: 'starships',
            element: <StarshipsPage />,
          },
        ],
      },
      {
        path: '/:entity/:name',
        element: <AboutEntity />,
      },
      {
        path: 'test',
        element: <h1>test</h1>,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
