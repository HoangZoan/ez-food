import React from "react";
import Hero from "pages/Home/Hero";
import Trends from "./Trends";
import HomeMenuList from "./HomeMenuList";

const Home = () => {
  return (
    <>
      <Hero />
      <Trends />
      <HomeMenuList />
    </>
  );
};

export default React.memo(Home);
