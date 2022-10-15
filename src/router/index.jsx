import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Mutant from '../pages/Mutant';
import Places from '../pages/Places';
import Vehicles from '../pages/Vehicles';
import PlaceDetails from '../pages/PlaceDetails';
import VehicleDetails from '../pages/VehicleDetails';
import PowerDetails from '../pages/PowerDetails';
import Powers from '../pages/Powers';
import CreateEditMutant from '../pages/CreateEditMutant';

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
    path: 'mutant/create',
    element: <CreateEditMutant />,
  },
  {
    path: 'mutant/edit/:id',
    element: <CreateEditMutant />,
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
    path: 'powers',
    element: <Powers />,
  },
  {
    path: 'places/:id',
    element: <PlaceDetails />,
  },
  {
    path: 'vehicles/:id',
    element: <VehicleDetails />,
  },
  {
    path: 'powers/:id',
    element: <PowerDetails />,
  },
]);
