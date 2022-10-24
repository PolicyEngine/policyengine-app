import './style/App.css';
import Header from './header';
import Posts from './posts';
import React, {
  useContext, useState,
} from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  useLocation,
} from "react-router-dom";
import Context from './context';

function App() {
  const context = useContext(Context);
  const [contextData, setContextData] = useState({});
  context.state = contextData;
  context.setState = setContextData;
  const router = createBrowserRouter([
    {
      path: "/uk",
      element: <><Header /><Posts /></>,
    },
    {
      path: "/us",
      element: <><Header /><Posts /></>,
    },
    {
      path: "/",
      element: <Navigate to="/uk" />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
