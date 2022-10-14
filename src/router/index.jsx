import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Mutant from '../pages/Mutant';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'mutant/:id',
    element: <Mutant />,
  },
]);
