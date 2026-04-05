import { RouterProvider } from 'react-router';
import { router } from './provider/routes';
import { AuthInitializer } from './provider/AuthInitializer';

const App = () => {
  return (
    <AuthInitializer>
      <RouterProvider router={router} />
    </AuthInitializer>
  );
};

export default App;
