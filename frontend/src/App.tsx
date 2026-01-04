import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import SignupPage from "./pages/SignUp";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <SignupPage />
      </ThemeProvider>
    </>
  );
}

export default App;
