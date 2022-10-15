import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import './index.css';
import './styles/Modal.css';
import 'sweetalert2/src/sweetalert2.scss';

ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router} />);
