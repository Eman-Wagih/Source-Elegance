import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import SignupPage from "./pages/SignUp";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <SignupPage />
        <ToastContainer />
      </ThemeProvider>
    </>
  );
}

export default App;
