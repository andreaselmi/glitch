import React from "react";

import Header from "../components/containers/Header";
import Footer from "../components/Footer";
import HomeSection from "../components/HomeSection";

const HomePage = () => {
  return (
    <>
      <Header />
      <HomeSection name="entry-section" />
      <HomeSection />
      <HomeSection />
      <Footer />
    </>
  );
};

export default HomePage;
