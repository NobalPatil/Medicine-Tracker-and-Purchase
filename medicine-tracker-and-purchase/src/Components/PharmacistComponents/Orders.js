import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import NavBar from "./PharmacistNavBar";
import swal from "sweetalert";
import Footer from "../Footer";

function OrderList() {
  const orders = JSON.parse(localStorage.getItem("orders"));

  return (
    <>
      {localStorage.getItem("pharmacist") != null ? (
        <div>
          <NavBar />
          <div className="d-flex justify-content-center p-3 shadow-lg">
            <h3 className="fw-bold text-primary">O r d e r s</h3>
          </div>
          <div class="row">
            {orders.map((ordr, key) => {
              return (
                <div
                  key={key}
                  class="card m-auto mb-3 card-text d-flex"
                  style={{ width: "400px", padding: "10px" }}
                >
                  <th style={{ fontSize: "22px", color: "#000075" }}>
                    Order Date : {ordr.order.orderDate}
                  </th>
                  <hr />
                  <th style={{ fontSize: "22px" }}>
                    Medicine Name : {ordr.order.medicine.medName}
                  </th>
                  <th style={{ fontSize: "15px" }}>
                    Order Quantity : {ordr.order.orderQuantity} (strips/items)
                  </th>
                  <th style={{ fontSize: "15px" }}>
                    Order Price : Rs. {ordr.order.orderPrice}
                  </th>
                  <th style={{ fontSize: "15px" }}>
                    Customer Name : {ordr.order.customer.custName}
                  </th>
                  <th style={{ fontSize: "15px" }}>
                    Mobile No. : {ordr.order.customer.custMobNo}
                  </th>
                  <th style={{ fontSize: "15px" }}>
                    Delivery Type : {ordr.deliveryType}
                  </th>
                  <th style={{ fontSize: "15px" }}>
                    Delivery Address : {ordr.deliveryAddress}
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

export default OrderList;
