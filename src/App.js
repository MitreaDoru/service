import './index.css';
import Header from './components/header/Header';
import Clients from './components/pages/Clients';
import Parts from './components/pages/Parts';
import Appointments from './components/pages/Appointments';
import { createBrowserRouter, RouterProvider, } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/', element: <Header />, children: [
      { path: '/clients', element: <Clients /> },
      { path: '/parts', element: <Parts /> },
      { path: '/appointments', element: <Appointments /> },
    ]
  }
])

const App = () => {
  return (
    <div >
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
