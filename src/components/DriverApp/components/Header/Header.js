import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { LogOut } from "react-feather";
import { removeCookie } from "../../../../core/CookiesHandler";
import { LocalKey, AppRoutes } from "../../../../core/constant";
import { userLogout } from "../../../LoginModule/Login.services";

function DriverAppHeader({ title }) {
  const navigate = useNavigate();
  const logout = () => {
    userLogout("logout").then((res) => {
      console.log("User Logout", res);
      removeCookie(LocalKey.saveApi);
      removeCookie(LocalKey.saveUser);
      // navigate(AppRoutes.admin);
      window.location.href = AppRoutes.admin;
    });
  };
  return (
    <>
      <div className="top-bar">
        <span>
          {title != "Home" && (
            <button className="back-button" onClick={() => navigate(-1)}>
              <span>&#60;</span> Back
            </button>
          )}
        </span>
        <span class="header-push text-white">{title}</span>
        <span class="header-push" title="logout">
          {title === "Account" && (
            <button className="back-button" onClick={logout}>
              <span>
                {" "}
                <LogOut />
              </span>
            </button>
          )}
        </span>
      </div>
    </>
  );
}

export default DriverAppHeader;
