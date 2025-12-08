import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";
import Navbar from "./Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
