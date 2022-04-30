import { Routes, useLocation, Link } from "react-router-dom";
import PageHeader from "./layouts/PageHeader";

function App() {
  const { pathname } = useLocation();

  const checkOnMainPage = () => {
    if (pathname !== "/") return false;

    return true;
  };

  return (
    <>
      <PageHeader isOnMainPage={checkOnMainPage()} />

      <div>z</div>
      <div>z</div>
      <div>z</div>
      <div>z</div>
      <div>z</div>
      <div>z</div>
      <div>z</div>
      <div>z</div>
      <div>z</div>
      <div>z</div>
      <div>z</div>
      <div>z</div>
      <div>z</div>
      <div>z</div>
      <div>z</div>
      <div>z</div>
      <div>z</div>
      <div>z</div>
      <div>z</div>
      <div>z</div>
      <div>z</div>
      <div>z</div>
      <div>z</div>
      <div>z</div>
      <div>z</div>
      <div>z</div>
      <div>z</div>
      <div>z</div>
      <div>z</div>
      <div>z</div>
      <div>z</div>
      <div>z</div>
      <div>z</div>
      <div>z</div>
      <div>z</div>
      <div>z</div>
      <div>z</div>
      <div>z</div>
      <div>z</div>
      <div>z</div>
      <div>z</div>
    </>
    // <Routes></Routes>
  );
}

export default App;
