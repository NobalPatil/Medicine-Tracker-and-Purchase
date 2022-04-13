import axios from "axios";
import { useState } from "react";
import swal from "sweetalert";
import NavBar from "./CustomerNavBar";
import medorder from "../../Images/medorder.jpg";
import Footer from "../Footer";

export default function OrderMedicine() {
  const medicine = JSON.parse(localStorage.getItem("searchedMedicine"));
  const customer = JSON.parse(localStorage.getItem("customer"));

  const [orderQuantity, setOrderQuantity] = useState(1);
  const [deliveryType, setDeliveryType] = useState("Home Delivery");
  const [deliveryAddress, setDeliveryAddress] = useState(customer.custAddress);

  const [disability, setDisability] = useState(false);

  const handleDeliveryType = (value) => {
    setDeliveryType(value);
    handleTextArea();
  };

  const handleTextArea = () => {
    setDisability(!disability);
    setDeliveryAddress("");
  };

  const handleInput = (e) => {
    e.preventDefault();

    if (orderQuantity <= 0) {
      swal("error", "Please enter valid quantity", "error");
    } else if (
      deliveryType === "" ||
      (deliveryType === "Home Delivery" && deliveryAddress === "")
    ) {
      swal("error", "Please enter details", "error");
    } else {
      orderMedicine();
    }
  };

  const orderMedicine = () => {
    const med = {
      medicine: medicine,
      orderQuantity: orderQuantity,
      delivery: {
        deliveryType: deliveryType,
        deliveryAddress: deliveryAddress,
      },
      customer: customer,
    };
    if (medicine.isInStock) {
      axios
        .post("http://localhost:8081/order-medicine", med)
        .then((res) => {
          if (Object.keys(res.data).length) {
            swal("success", "Your order has been placed!", {
              timer: 2000,
            }).then(() => (window.location.href = "/google-map"));
          } else
            swal("Error", "Something went wrong, please try again", "error", {
              timer: 2000,
            });
        })
        .catch(() =>
          swal("Error", "Something went wrong, please try again", "error", {
            timer: 2000,
          })
        );
    } else
      swal("Sorry", "Currently Medicine is Not in Stock !!", "error").then(
        () => (window.location.href = "/google-map")
      );
  };

  return (
    <>
      {localStorage.getItem("customer") != null ? (
        <div>
          <NavBar />
          <span className="d-flex justify-content-center mt-4 w-50">
            <label className="fs-4 text-primary p-2 shadow-sm">
              O R D E R - ]^[ E D I C I N E
            </label>
          </span>
          <div className="d-flex flex-column mb-5">
            <div className="d-flex p-2 ms-5">
              <div className="p-5">
                <h3>
                  <b>{medicine.medName}</b>
                </h3>
                <h6 className="text-secondary">{medicine.medManufacturer}</h6>
                <br />
                <h5 style={{ color: "#555" }}>Price</h5>
                <h4>&#x20B9; {medicine.medCost}</h4>
                <span className="text-secondary">per strip/item</span>
                <br />
                <br />
                <h5 style={{ color: "#555" }}>Use of {medicine.medName}</h5>
                <h6>{medicine.medUse}</h6>
                <br />
                {medicine.isInStock ? (
                  <h5 className="text-success">In Stock</h5>
                ) : (
                  <h5 className="text-danger">Not In Stock</h5>
                )}
              </div>
              <div className="p-5">
                <div className="d-flex flex-column p-3">
                  <label style={{ color: "#444" }} for="quantity">
                    Quantity
                  </label>
                  <input
                    className="w-25"
                    name="orderQuantity"
                    type="number"
                    value={orderQuantity}
                    onChange={(e) => setOrderQuantity(e.target.value)}
                  />
                </div>
                <div className="d-flex flex-column p-3">
                  <label style={{ color: "#444" }} for="dtype">
                    Delivery Type
                  </label>
                  <select
                    name="deliveryType"
                    id="delivery"
                    onChange={(e) => handleDeliveryType(e.target.value)}
                  >
                    <option value="Home Delivery">Home Delivery</option>
                    <option value="In-Store Pickup">In-Store Pickup</option>
                  </select>
                </div>
                <div className="d-flex flex-column p-3">
                  <label style={{ color: "#444" }} for="daddress">
                    Delivery Address
                  </label>
                  <textarea
                    rows="2"
                    name="deliveryAddress"
                    disabled={disability}
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <img
                  src={medorder}
                  className="shadow-lg"
                  style={{ width: "45vw", height: "65vh" }}
                />
              </div>
            </div>
            <div className="d-flex justify-content-center w-50">
              <button
                type="button"
                class="btn btn-dark w-25"
                onClick={handleInput}
              >
                O r d e r
              </button>
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
