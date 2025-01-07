import React from 'react';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import './App.scss';
import Features from "./pages/feature/Features";
import Home from "./pages/HomePage";
// import Inbox from "./pages/features/inbox/Inbox";
// import Register from "./pages/register/Register";
import PlaceOrder from "./pages/PlaceOrder"; // Import PlaceOrder component
import Login from './pages/login/Login';
import Inbox from './pages/feature/Inbox/Inbox';

// Create a router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <Features />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "inbox",
        element: <Inbox />,
      },
      {
        path: "place-order",
        element: <PlaceOrder />, // Add PlaceOrder route
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  // {
  //   path: "/register",
  //   element: <Register />,
  // },
]);

// Define the App component
const App: React.FC = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
