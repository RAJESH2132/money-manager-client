import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Income from "./pages/Income";
import Expense from "./pages/Expense";
import Category from "./pages/Category";
import Filter from "./pages/Filter";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import { getStoredToken } from "./util/authStorage";

const ProtectedRoute = ({ element }) => {
  return getStoredToken() ? element : <Navigate to="/login" replace />;
};

const GuestRoute = ({ element }) => {
  return getStoredToken() ? <Navigate to="/dashboard" replace /> : element;
};

const App = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Navigate
                to={getStoredToken() ? "/dashboard" : "/login"}
                replace
              />
            }
          />
          <Route path="/dashboard" element={<ProtectedRoute element={<Home />} />} />
          <Route path="/income" element={<ProtectedRoute element={<Income />} />} />
          <Route path="/expense" element={<ProtectedRoute element={<Expense />} />} />
          <Route path="/category" element={<ProtectedRoute element={<Category />} />} />
          <Route path="/filter" element={<ProtectedRoute element={<Filter />} />} />
          <Route path="/login" element={<GuestRoute element={<Login />} />} />
          <Route path="/signup" element={<GuestRoute element={<Signup />} />} />
          <Route
            path="*"
            element={
              <Navigate
                to={getStoredToken() ? "/dashboard" : "/login"}
                replace
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
