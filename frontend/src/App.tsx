import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import SignupPage from "./pages/SignUp";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import Home from "./pages/Home";
import MerchantSignupPage from "./pages/MerchantSignUp";
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignupPage />} />
          <Route path="/sign-up/merchant" element={<MerchantSignupPage />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
