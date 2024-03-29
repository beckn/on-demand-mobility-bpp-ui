import { Spinner } from "@simply007org/react-spinners";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import { Vehicles } from "./components/Vechicles/Vehicles";
import { AuthGuard } from "./core/AuthGuard";
import { AppRoutes, LocalKey, NoHeader } from "./core/constant";
import ErrorBoundary from "./shared/ErrorBoundary";
const AppHeader = React.lazy(() => import("./components/AppHeader"));

const Login = React.lazy(() => import("./components/LoginModule/Login"));
const SignUp = React.lazy(() => import("./components/LoginModule/SignUp"));
const SignInPassword = React.lazy(() =>
  import("./components/LoginModule/SignInPassword/SignInPassword")
);
const SignInPhone = React.lazy(() =>
  import("./components/LoginModule/SignInPhone")
);
const Dashboard = React.lazy(() => import("./components/Dashboard/Dashboard"));
const PageNotFound = React.lazy(() =>
  import("./shared/PageNotFound/PageNotFound")
);
let isLogin = !NoHeader.includes(window.location.pathname);

function App() {
  return (
    <>
      <ToastContainer position="top-center" hideProgressBar="false" />
      <Spinner name={LocalKey.spinnerKey}>
        <div className="modal d-block">
          <div className="modal-dialog modal-sm modal-dialog-centered">
            <div className="modal-content text-center p-3">
              <img
                src="assets/images/Loading.svg"
                width={"60px"}
                height={"60px"}
                className="m-auto my-3"
                alt=""
              />
              <p className="mb-0">Please wait</p>
              <p className="text-muted small mb-0">
                while processing your request!
              </p>
            </div>
          </div>
        </div>
        <div className="modal-backdrop show"></div>
      </Spinner>
      <BrowserRouter forceRefresh={true}>
        <ErrorBoundary>
          <Suspense>
            {/* {isLogin && <AppHeader />} */}
            <Routes>
              <Route path="/" element={<SignInPassword />}></Route>
              <Route path={AppRoutes.admin} element={<SignInPassword />}></Route>
              <Route path={AppRoutes.signUp} element={<SignUp />}></Route>
              <Route
                path={AppRoutes.signInPassword}
                element={<SignInPassword />}
              ></Route>
              <Route
                path={AppRoutes.signInOtp}
                element={<SignInPhone />}
              ></Route>
              <Route
                path={AppRoutes.adminDashboard}
                element={
                  <AuthGuard>
                    <Dashboard />
                  </AuthGuard>
                }
              ></Route>
              <Route path="/*" element={<PageNotFound />}></Route>
            </Routes>
            {/* {isLogin && <AppFooter />} */}
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </>
  );
}

export default App;
