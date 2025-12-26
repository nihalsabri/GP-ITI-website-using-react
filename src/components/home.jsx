import { Outlet } from "react-router";
import Footer from "./footer";
// import Header from "./Header";
import Navbar from "./Navbar";

export default function Home() {
  return (
    <div className=" bg-white dark:bg-gray-900">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
