import React from "react";
import Hero from "pages/Home/Hero";
import Trends from "./Trends";

const Home = () => {
  return (
    <>
      <Hero />
      <Trends />
    </>
  );
};

export default React.memo(Home);
