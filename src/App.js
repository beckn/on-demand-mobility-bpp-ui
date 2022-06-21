import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import { Spinner } from "@simply007org/react-spinners";
import {} from "@simply007org/react-spinners";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AppFooter from "./components/AppFooter";
import AppHeader from "./components/AppHeader";
import Login from "./components/Login";
import ErrorBoundary from "./shared/ErrorBoundary";

function App() {
  return (
    <>
      
      <ToastContainer position="top-center" hideProgressBar="false" />
      <Spinner name="mySpinner">Loading...</Spinner>
      <BrowserRouter>
        <ErrorBoundary>
          <AppHeader />
          <Routes>
            <Route path="/" element={<Login />}></Route>
          </Routes>
          <AppFooter />
        </ErrorBoundary>
      </BrowserRouter>
    </>
  );
}

export default App;
