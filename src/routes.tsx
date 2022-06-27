import Footer from "layouts/Footer";
import Admin from "pages/Admin";
import CheckOut from "pages/CheckOut";
import Home from "pages/Home";
import Login from "pages/Admin/Login";
import ProductDetail from "pages/ProductDetail";
import Products from "pages/Products";
import { Routes, Route, Navigate } from "react-router-dom";
import PageHeader from "./layouts/PageHeader";
import { ReactQueryDevtools } from "react-query/devtools";
import StatusSnackbar from "components/StatusSnackbar";
import ConfirmationDialog from "components/ConfirmationDialog";
import AuthGuard from "hoc/AuthGuard";
import { useQueryClient } from "react-query";
import { prefetchMenuPopup } from "api/menu/hooks";
import { useCallback, useEffect } from "react";

function App() {
  const queryClient = useQueryClient();
  const prefetchTodos = useCallback(async () => {
    await queryClient.prefetchQuery(
      ["menu", { tableType: "fried", limit: 3 }],
      prefetchMenuPopup
    );
  }, [queryClient]);

  useEffect(() => {
    prefetchTodos();
  }, [prefetchTodos]);

  return (
    <>
      <PageHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:type" element={<Products />} />
        <Route path="/products/:type/:productId" element={<ProductDetail />} />
        <Route path="/check-out" element={<CheckOut />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={AuthGuard(<Navigate to="/admin/orders?order=in-queue" />)}
        />
        <Route path="/admin/*" element={AuthGuard(<Admin />)} />
      </Routes>

      <ConfirmationDialog />
      <StatusSnackbar />

      <Footer />

      <ReactQueryDevtools />
    </>
  );
}

export default App;
