import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../../CSS/NavBar.css";

export default function Navbar() {
  const [click, setClick] = useState();

  const logout = () => {
    localStorage.setItem("role", "");
    localStorage.clear();
  };

  return (
    <>
      <div>
        <nav class="navbar navbar-dark bg-dark p-0">
          <div className="row w-100">
            <div className="nav-container col-8 d-flex justify-content-start ps-5">
              <h4 className="pb-2" style={{ color: "orange" }}>
                ]^[ e d T r a c k e r
              </h4>
              <ul className={click ? "nav-menu active" : "nav-menu"}>
                <li className="nav-item">
                  <NavLink exact to="/pharmacist-home" className="nav-links">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink exact to="/about-us" className="nav-links">
                    About Us
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink exact to="/contact-us" className="nav-links">
                    Contact Us
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="nav-container col-4 d-flex justify-content-end">
              <ul className={click ? "nav-menu active" : "nav-menu"}>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/login-page"
                    className="nav-links"
                    onClick={logout}
                  >
                    Logout
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
