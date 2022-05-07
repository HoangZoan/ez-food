import React from "react";
import Hero from "pages/Home/Hero";
import Trends from "./Trends";
import HomeMenuList from "./HomeMenuList";
import AboutUs from "./AboutUs";
import Locations from "./Locations";
import Footer from "layouts/Footer";

const Home = () => {
  return (
    <>
      <Hero />
      <Trends />
      <HomeMenuList />
      <AboutUs />
      <Locations />
      <Footer />
    </>
  );
};

export default React.memo(Home);
