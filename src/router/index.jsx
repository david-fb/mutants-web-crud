import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Mutant from '../pages/Mutant';
import Places from '../pages/Places';
import Vehicles from '../pages/Vehicles';
import PlaceDetails from '../pages/PlaceDetails';
import VehicleDetails from '../pages/VehicleDetails';

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
  {
    path: 'places/:id',
    element: <PlaceDetails />,
  },
  {
    path: 'vehicles/:id',
    element: <VehicleDetails />,
  },
]);
