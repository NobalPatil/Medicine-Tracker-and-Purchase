import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../../CSS/CustomerHome.css";
import swal from "sweetalert";
import custHomeImg1 from "../../Images/med2.jpg";
import custHomeImg2 from "../../Images/med3.jpeg";
import axios from "axios";
import HomeNavBar from "./HomeNavBar";
import Footer from "../Footer";

function CustomerHome() {
  const [medName, setMedName] = useState("");

  const customer = JSON.parse(localStorage.getItem("customer"));

  const customerId = customer.custId;

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

  return (
    <>
      {localStorage.getItem("customer") != null ? (
        <div>
          <HomeNavBar />
          <div className="row">
            <div className="col-6">
              <div className="d-flex flex-column justify-content-center align-items-center h-100">
                <h4 className="text-dark p-3">
                  <b> Welcome back, {customer.custName} !</b>
                </h4>
                <input
                  className="fs-6 w-50"
                  type="text"
                  placeholder="Search Medicine . . . ."
                  onChange={(e) => setMedName(e.target.value)}
                ></input>
                <button className="btn btn-danger btn-md" onClick={searchMed}>
                  Search
                </button>
              </div>
            </div>
            <div className="col-6 d-flex justify-content-end">
              <img
                style={{ height: "550px", width: "755px" }}
                src={custHomeImg1}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <img
                style={{ height: "550px", width: "765px" }}
                src={custHomeImg2}
              />
            </div>
            <div className="col-6 d-flex justify-content-center align-items-center">
              <div
                class="card shadow h-50 w-50"
                onClick={getOrderHistory}
                style={{ cursor: "pointer" }}
              >
                <div class="card-body d-flex justify-content-center align-items-center">
                  <h3 class="card-title fw-bold text-primary">Your Orders</h3>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        swal({
          icon: "error",
          text: "You are not logged in!",
          type: "error",
          timer: 3000,
        }).then(function () {
          window.location.href = "/login-page";
        })
      )}
    </>
  );
}
export default CustomerHome;
