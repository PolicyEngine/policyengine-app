import './style/App.css';
import Header from './header';
import Posts from './posts';
import React, {
  useContext,
} from 'react';
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import Context from './context';

function App() {
  const context = useContext(Context);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Posts />,
    },
  ]);
  return (
    <div>
      <Header />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
