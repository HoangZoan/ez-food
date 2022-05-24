import Footer from "layouts/Footer";
import Admin from "pages/Admin";
import CheckOut from "pages/CheckOut";
import Home from "pages/Home";
// import Login from "pages/Login";
import ProductDetail from "pages/ProductDetail";
import Products from "pages/Products";
import { Routes, Route, Navigate } from "react-router-dom";
import PageHeader from "./layouts/PageHeader";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import StatusSnackbar from "components/StatusSnackbar";
import ConfirmationDialog from "components/ConfirmationDialog";

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
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/check-out" element={<CheckOut />} />
        {/* <Route path="/admin" element={<Login />} /> */}
        <Route path="/admin" element={<Navigate to="/admin/orders" />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>

      <ConfirmationDialog />
      <StatusSnackbar />

      <Footer />

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
