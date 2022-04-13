import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import swal from "sweetalert";
import "../../CSS/NavBar.css";

export default function Navbar() {
  const [click, setClick] = useState();

  const pharmacistId = JSON.parse(
    localStorage.getItem("pharmacist")
  ).pharmacistId;

  const getMedicines = () => {
    axios
      .get(`http://localhost:8081/view-medicines?pharmacistId=${pharmacistId}`)
      .then((res) => {
        if (Object.keys(res.data).length) {
          localStorage.setItem("medicines", JSON.stringify(res.data));
          window.location.href = "/medicines";
        } else
          swal("No data found", "", "error", {
            timer: 2000,
          });
      })
      .catch(() =>
        swal("Error", "Something went wrong", "error", {
          timer: 2000,
        })
      );
  };

  const getOrders = () => {
    axios
      .get(`http://localhost:8081/view-orders?pharmacistId=${pharmacistId}`)
      .then((res) => {
        if (Object.keys(res.data).length) {
          localStorage.setItem("orders", JSON.stringify(res.data));
          window.location.href = "/orders";
        } else
          swal("No data found", "", "error", {
            timer: 2000,
          });
      })
      .catch(() =>
        swal("Error", "Something went wrong", "error", {
          timer: 2000,
        })
      );
  };

  const logout = () => {
    localStorage.setItem("role", "");
    localStorage.clear();
  };

  return (
    <>
      <div>
        <nav class="navbar navbar-dark bg-dark p-0">
          <div className="row w-100">
            <div className="nav-container col-9">
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
                <li className="nav-item">
                  <NavLink exact to="/add-medicine" className="nav-links">
                    Add Medicines
                  </NavLink>
                </li>
                <li className="nav-item">
                  <Button className="nav-links bg-dark" onClick={getMedicines}>
                    Medicines
                  </Button>
                </li>
                <li className="nav-item">
                  <Button className="nav-links bg-dark" onClick={getOrders}>
                    Orders
                  </Button>
                </li>
              </ul>
            </div>
            <div className="nav-container col-3 d-flex justify-content-end">
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
