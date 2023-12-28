import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import SignIn from "./components/SignIn";
import Signup from "./components/Signup";
import "./index.css";
import Dashboard from "./components/Dashboard";

const router = createBrowserRouter([
  { path: "/", element: <Dashboard /> },
  {
    path: "/home",
    element: <App />,
  },
  { path: "/signup", element: <Signup /> },
  { path: "/signin", element: <SignIn /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
