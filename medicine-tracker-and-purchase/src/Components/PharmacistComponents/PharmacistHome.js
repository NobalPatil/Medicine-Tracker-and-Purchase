import "bootstrap/dist/css/bootstrap.css";
import HomeNavBar from "./HomeNavBar";
import swal from "sweetalert";
import pharmaHomeImg1 from "../../Images/med4.png";
import pharmaHomeImg2 from "../../Images/med5.png";
import pharmaHomeImg3 from "../../Images/med6.png";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "../Footer";

export default function PharmacistHome() {
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

  return (
    <>
      {localStorage.getItem("pharmacist") != null ? (
        <div>
          <HomeNavBar />
          <div className="row mt-5 pt-5 w-100">
            <div className="col-4 d-flex justify-content-center">
              <img style={{ height: "250px" }} src={pharmaHomeImg1} />
            </div>
            <div className="col-4 d-flex justify-content-center">
              <img style={{ height: "250px" }} src={pharmaHomeImg2} />
            </div>
            <div className="col-4 d-flex justify-content-center">
              <img style={{ height: "250px" }} src={pharmaHomeImg3} />
            </div>
          </div>
          <div className="row mb-5 mt-3 p-3">
            <div className="col-4 d-flex justify-content-center">
              <div
                class="card shadow w-50"
                style={{ cursor: "pointer" }}
                onClick={getMedicines}
              >
                <div class="card-body d-flex justify-content-center align-items-center">
                  <h3 class="card-title fw-bold text-primary">
                    Your Medicines
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-4 d-flex justify-content-center">
              <div
                class="card shadow w-50"
                style={{ cursor: "pointer" }}
                onClick={getOrders}
              >
                <div class="card-body d-flex justify-content-center align-items-center">
                  <h3 class="card-title fw-bold text-primary">Orders</h3>
                </div>
              </div>
            </div>
            <div className="col-4 d-flex justify-content-center">
              <Link to="/add-medicine" style={{ textDecoration: "none" }}>
                <div class="card shadow" style={{ cursor: "pointer" }}>
                  <div class="card-body d-flex justify-content-center align-items-center">
                    <h3 class="card-title fw-bold text-primary">
                      Add Medicines
                    </h3>
                  </div>
                </div>
              </Link>
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
