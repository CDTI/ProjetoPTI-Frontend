// React Router Dom
import { BrowserRouter } from "react-router-dom";
// Router
import { Router } from "./routes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export function App() {
  return (
    <BrowserRouter>
      <ToastContainer pauseOnFocusLoss={false} />

      <Router />
    </BrowserRouter>
  );
}
