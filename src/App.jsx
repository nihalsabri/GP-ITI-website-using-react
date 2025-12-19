import { Outlet } from "react-router-dom";
import { ThemeContext } from "./context/theme";

import Navbar from "./components/Navbar";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import { useSelector } from "react-redux";
import Services from "./components/Services";
import NotFound from "./components/NotFound";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";
import Tradespeople from "./components/Tradespeople";
import Login from "./components/Login";
import Register from "./components/Register";
import Search from "./components/Search";
import Tradesperson from "./components/Tradesperson";
import Home from "./components/home";
import { Suspense } from "react";
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
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "about",
        element: <AboutUs />,
      },
      {
        path: "contact",
        element: <Contact />,
      },

      {
        path: "tradespeople",
        element: <Tradespeople />,
      },

      {
        path: "/tradespeople/:id",
        element: <Tradesperson />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
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
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <div
        className={`${
          theme === "dark"
            ? "bg-gray-900 text-white"
            : "text-gray-900 bg-gray-100"
        } min-h-screen `}
      >
        <RouterProvider router={router} />
      </div>
    </Suspense>
  );
}

export default App;
