import { Outlet } from "react-router";
import "./App.css";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./components/LandingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      // {
      //   path: "services",
      //   element: <Services />,
      // },
      // {
      //   path: "about",
      //   element: <About />,
      // },
      // {
      //   path: "contact",
      //   element: <Contact />,
      // },
    ],
  },
]);

//* REACT ONLY HAS COMPONENTS "BEST PRACTICE WISE"
//* NEXT.js HAS PAGES

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
