import Footer from "layouts/Footer";
import Admin from "pages/Admin";
import CheckOut from "pages/CheckOut";
import Home from "pages/Home";
import Login from "pages/Admin/Login";
import ProductDetail from "pages/ProductDetail";
import Products from "pages/Products";
import { Routes, Route, Navigate } from "react-router-dom";
import PageHeader from "./layouts/PageHeader";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import StatusSnackbar from "components/StatusSnackbar";
import ConfirmationDialog from "components/ConfirmationDialog";
import AuthGuard from "hoc/AuthGuard";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PageHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:type" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
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
    </QueryClientProvider>
  );
}

export default App;
