import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import AppFooter from "./components/AppFooter";
import AppHeader from "./components/AppHeader";
import Login from "./components/Login";
import ErrorBoundary from "./shared/ErrorBoundary";

function App() {
  return (
    <>
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
