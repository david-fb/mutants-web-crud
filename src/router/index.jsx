import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Mutant from '../pages/Mutant';
import Places from '../pages/Places';
import Vehicles from '../pages/Vehicles';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'mutant/:id',
    element: <Mutant />,
  },
  {
    path: 'places',
    element: <Places />,
  },
  {
    path: 'vehicles',
    element: <Vehicles />,
  },
]);
