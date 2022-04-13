import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../../CSS/NavBar.css";

export default function HomeNavBar() {
  const [click, setClick] = useState(false);

  const logout = () => {
    localStorage.setItem("role", "");
    localStorage.clear();
  };

  return (
    <>
      <div>
        <nav class="navbar navbar-dark bg-dark">
          <div className="row w-100">
            <div className="nav-container d-flex justify-content-start pb-3 col-9">
              <h4 className="ms-4 pb-2" style={{ color: "orange" }}>
                ]^[ e d T r a c k e r
              </h4>
              <ul className={click ? "nav-menu active" : "nav-menu"}>
                <li className="nav-item">
                  <NavLink exact to="/customer-home" className="nav-links">
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
            <div className="nav-container col-3 d-flex justify-content-end">
              <ul className={click ? "nav-menu active" : "nav-menu"}>
                <li className="nav-item mb-3">
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
            <div className="nav-icon">
              <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
