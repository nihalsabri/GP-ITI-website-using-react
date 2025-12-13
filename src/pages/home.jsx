import AboutUs from "../components/AboutUS";
import Footer from "../components/footer";
import Header from "../components/header";

export default function Home() {
  return (
    <div>
      <Header />
      <h1>Welcome to the Home Page</h1>
      <p>This is the main landing page of the application.</p>
<AboutUs />
      <Footer />
    </div>
  )
}