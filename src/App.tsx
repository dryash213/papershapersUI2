// src/App.tsx
// In App.tsx or main entry point file
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./routes";
import { ToastContainer } from "react-toastify";
import { HelmetProvider } from "react-helmet-async";
import SeoStructuredData from "components/SeoStructureData";

const App = () => (
  <>
    <HelmetProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
      <SeoStructuredData />
      <AppRoutes />
    </HelmetProvider>
  </>
);

export default App;
