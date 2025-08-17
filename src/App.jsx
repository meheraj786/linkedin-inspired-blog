import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./layouts/RootLayout";
import WelcomePage from "./pages/WelcomePage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: RootLayout,
      children: [
        {
          index: true,
          element: <WelcomePage />,
        },
      ],
    },
    { path: "/signup", element: <Signup /> },
    { path: "/login", element: <Login /> },
  ]);

  return (
    <>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    </>
  );
}

export default App;
