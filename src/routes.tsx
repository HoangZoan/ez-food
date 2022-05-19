import Footer from "layouts/Footer";
import Admin from "pages/Admin";
import CheckOut from "pages/CheckOut";
import Home from "pages/Home";
// import Login from "pages/Login";
import ProductDetail from "pages/ProductDetail";
import Products from "pages/Products";
import { Routes, Route } from "react-router-dom";
import PageHeader from "./layouts/PageHeader";

function App() {
  return (
    <>
      <PageHeader />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/check-out" element={<CheckOut />} />
        {/* <Route path="/admin" element={<Login />} /> */}
        <Route path="/admin/*" element={<Admin />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
