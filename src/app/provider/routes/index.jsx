import { createBrowserRouter } from 'react-router';
import { NotFoundPage } from '@/pages/not-found';
import authRoutes from './auth.route';
import homeRoutes from './home.route';

export const router = createBrowserRouter([
  ...authRoutes,
  ...homeRoutes,
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
