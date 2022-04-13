import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import NavBar from "./PharmacistNavBar";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import Footer from "../Footer";

function MedicineList() {
  const medicines = JSON.parse(localStorage.getItem("medicines"));

  const selectMedicine = (item) => {
    localStorage.setItem("updateMed", JSON.stringify(item));
  };

  return (
    <>
      {localStorage.getItem("pharmacist") != null ? (
        <div>
          <NavBar />
          <div className="d-flex justify-content-center p-3 shadow-lg">
            <h3 className="fw-bold text-primary">M e d i c i n e s</h3>
          </div>
          <div class="row">
            {medicines.map((item, index) => {
              return (
                <div
                  key={index}
                  class="card mt-0 m-auto mb-3 card-text d-flex"
                  style={{ width: "400px", padding: "10px" }}
                >
                  <th style={{ fontSize: "25px", color: "#000075" }}>
                    {item.medName}
                  </th>
                  <hr />
                  <th style={{ fontSize: "22px" }}>
                    Manufacturer : {item.medManufacturer}
                  </th>
                  <th style={{ fontSize: "15px" }}>
                    Cost(per strip/item) : Rs. {item.medCost}
                  </th>
                  <th style={{ fontSize: "15px" }}>Use : {item.medUse}</th>
                  <th style={{ fontSize: "15px" }}>
                    Status : {item.isInStock ? "In Stock" : "Not In Stock"}
                  </th>
                  <Link
                    to="/update-medicine"
                    className="btn btn-dark"
                    style={{ textDecoration: "none" }}
                    onClick={() => selectMedicine(item)}
                  >
                    Update
                  </Link>
                </div>
              );
            })}
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

export default MedicineList;
