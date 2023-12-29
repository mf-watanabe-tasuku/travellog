import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "@/context/AuthContext";
import "@/styles/global.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ToastContainer position="bottom-right" />
      <Component {...pageProps} />
    </AuthProvider>
  );
}
