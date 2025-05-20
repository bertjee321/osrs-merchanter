import { ContentContainer } from "./content-container/ContentContainer";
import { Footer } from "./footer/Footer";
import { Navbar } from "./navbar/Navbar";

export const Layout = () => {
  return (
    <>
      <Navbar />
      <ContentContainer />
      <Footer />
    </>
  );
};