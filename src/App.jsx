import { Outlet } from "react-router";
import { ThemeContext } from "./context/theme";

import Footer from "./components/Footer";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import { useSelector } from "react-redux";
import Services from "./components/Services";
import NotFound from "./components/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "services",
        element: <Services />,
      },
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
  {
    path: "*",
    element: <NotFound />,
  },
]);

//* REACT ONLY HAS COMPONENTS "BEST PRACTICE WISE"
//* NEXT.js HAS PAGES

function App() {
  const theme = useSelector((state) => state.theme.mode);
  return (
    <div
      className={`${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "text-gray-900 bg-gray-100"
      } min-h-screen `}
    >
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
