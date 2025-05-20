import { Outlet, Link } from "react-router-dom";
import { Navbar } from "./navbar/Navbar";
import { ContentContainer } from "./content-container/ContentContainer";
import { Footer } from "./footer/Footer";

export const Layout = () => {
  return (
    <>
      <Navbar />
      <ContentContainer />
      <Footer />
    </>
  );
};