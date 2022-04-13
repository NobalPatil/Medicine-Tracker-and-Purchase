import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import swal from "sweetalert";
import NavBar from "./CustomerNavBar";
import Footer from "../Footer";

export default function OrderHistory() {
  const orders = JSON.parse(localStorage.getItem("orders"));

  return (
    <>
      {localStorage.getItem("customer") != null ? (
        <div>
          <NavBar />
          <div class="row">
            <div className="d-flex justify-content-center p-3 shadow-lg">
              <h3 className="fw-bold text-primary">Order History</h3>
            </div>
            {orders.map((ordr, key) => {
              return (
                <div
                  key={key}
                  class="card m-auto mb-3 card-text d-flex"
                  style={{ width: "400px", padding: "10px" }}
                >
                  <th className="text-dark" style={{ fontSize: "22px" }}>
                    Order Date : {ordr.orderDate}
                  </th>
                  <hr />
                  <th className="text-secondary" style={{ fontSize: "22px" }}>
                    Medicine : {ordr.medicine.medName}
                  </th>
                  <th className="text-secondary" style={{ fontSize: "22px" }}>
                    Manufacturer : {ordr.medicine.medManufacturer}
                  </th>
                  <th className="text-secondary" style={{ fontSize: "22px" }}>
                    Medicine Cost : Rs. {ordr.medicine.medCost}
                  </th>
                  <th className="text-secondary" style={{ fontSize: "22px" }}>
                    Order Quantity : {ordr.orderQuantity} (strips/items)
                  </th>
                  <th className="text-secondary" style={{ fontSize: "22px" }}>
                    Order Price : Rs. {ordr.orderPrice}
                  </th>
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
