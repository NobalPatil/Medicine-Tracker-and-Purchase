import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import swal from "sweetalert";
import "../../CSS/NavBar.css";

export default function NavBar() {
  const [click, setClick] = useState(false);

  const [medName, setMedName] = useState("");

  const customerId = JSON.parse(localStorage.getItem("customer")).custId;

  const searchMed = () => {
    if (medName !== "") {
      axios
        .get(`http://localhost:8081/search-pharma/?medName=${medName}`)
        .then((res) => {
          localStorage.setItem("pharmas", JSON.stringify(res.data));
          localStorage.setItem("medName", medName);
          if (Object.keys(res.data).length)
            window.location.href = "/google-map";
          else
            swal("Not available", "Please try after some time", "error", {
              timer: 2000,
            });
        })
        .catch(() =>
          swal("Something went wrong", "", "error", {
            timer: 2000,
          })
        );
    } else swal("", "Please enter medicine name", "error", { timer: 2000 });
  };

  const getOrderHistory = () => {
    axios
      .get(`http://localhost:8081/order-history/?custId=${customerId}`)
      .then((res) => {
        if (Object.keys(res.data).length) {
          localStorage.setItem("orders", JSON.stringify(res.data));
          window.location.href = "/your-orders";
        } else swal("No data found", "", "error", { timer: 2000 });
      })
      .catch(() => swal("Something went wrong", "", "error", { timer: 2000 }));
  };

  const logout = () => {
    localStorage.setItem("role", "");
    localStorage.clear();
  };

  return (
    <>
      <div>
        <nav class="navbar navbar-dark bg-dark">
          <div className="row w-100">
            <div className="nav-container pt-3 col-9">
              <h4 className="pb-5" style={{ color: "orange" }}>
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
                <li className="nav-item ">
                  <Button
                    className="bg-dark h-50 p-2"
                    onClick={getOrderHistory}
                  >
                    Your Orders
                  </Button>
                </li>
                <li className="ms-4 me-2 mb-3">
                  <input
                    className="fs-6 p-2"
                    type="text"
                    placeholder="Search Medicine . . . ."
                    onChange={(e) => setMedName(e.target.value)}
                  ></input>
                </li>
                <li className="mt-2">
                  <button className="btn btn-danger" onClick={searchMed}>
                    Search
                  </button>
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
