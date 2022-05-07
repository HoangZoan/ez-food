import Home from "pages/Home";
import Products from "pages/Products";
import { Routes, useLocation, Route } from "react-router-dom";
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </>
  );
}

export default App;
