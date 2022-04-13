import axios from "axios";
import { useState } from "react";
import swal from "sweetalert";
import Footer from "../Footer";
import Navbar from "./PharmacistNavBar";

export default function UpdateMedicine() {
  const med = JSON.parse(localStorage.getItem("updateMed"));
  const pharmacist = JSON.parse(localStorage.getItem("pharmacist"));

  const medId = med.medId;
  const [medName, setMedName] = useState(med.medName);
  const [medManufacturer, setMedManufacturer] = useState(med.medManufacturer);
  const [medCost, setMedCost] = useState(med.medCost);
  const [medUse, setMedUse] = useState(med.medUse);
  const [isInStock, setIsInStock] = useState(med.isInStock);

  const handleForm = (e) => {
    e.preventDefault();
    if (
      medName === "" ||
      medManufacturer === "" ||
      medCost === "" ||
      medUse === "" ||
      isInStock === ""
    ) {
      swal("Error", "Please enter details", "error");
    } else {
      updateMedicine();
    }
  };

  const updateMedicine = () => {
    const medicine = {
      medId: medId,
      medName: medName,
      medManufacturer: medManufacturer,
      medCost: medCost,
      medUse: medUse,
      isInStock: isInStock,
      pharmacist: pharmacist,
    };

    axios
      .post("http://localhost:8081/update-medicine", medicine)
      .then((res) => {
        if (Object.keys(res.data).length) {
          swal("success", " Medicine updated successfully!", "success", {
            timer: 2000,
          }).then(() => {
            axios
              .get(
                `http://localhost:8081/view-medicines?pharmacistId=${pharmacist.pharmacistId}`
              )
              .then((res) => {
                localStorage.setItem("medicines", JSON.stringify(res.data));
                window.location.href = "/medicines";
              });
          });
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
  };

  return (
    <>
      {localStorage.getItem("pharmacist") != null ? (
        <div>
          <Navbar />
          <div class="container mt-4 mb-4">
            <div class="row">
              <div class="col-2 "></div>
              <div class="col-8">
                <div class="row">
                  <div class="col-2"></div>
                  <div class="col-md-8">
                    <div class="do">
                      <form class="form-group">
                        <div class="inside-form mt-3 text-primary">
                          <center>
                            <h2>
                              <b>Update Medicine</b>
                            </h2>
                          </center>
                        </div>
                        <br />
                        <div class="form-group ">
                          <label className="fs-6" id="sty">
                            Medicine Name <span>*</span>
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="medName"
                            name="medName"
                            value={medName}
                            placeholder="Enter medicine name"
                            onChange={(e) => {
                              setMedName(e.target.value);
                            }}
                          />
                        </div>
                        <div class="form-group ">
                          <label className="fs-6" id="sty">
                            Manufacturer Name <span>*</span>
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="medManufacturer"
                            name="medManufacturer"
                            value={medManufacturer}
                            placeholder="Enter medicine manufacturer name"
                            onChange={(e) => {
                              setMedManufacturer(e.target.value);
                            }}
                          />
                        </div>
                        <div class="form-group ">
                          <label className="fs-6" id="sty">
                            Medicine Cost<span>*</span>
                          </label>
                          <input
                            class="form-control p-2"
                            rows="1"
                            type="number"
                            id="medCost"
                            name="medCost"
                            value={medCost}
                            placeholder="Enter medicine cost (Rs.)"
                            onChange={(e) => {
                              setMedCost(e.target.value);
                            }}
                          ></input>
                        </div>
                        <br />
                        <div class="form-group ">
                          <label className="fs-6" id="sty">
                            Medicine Use<span>*</span>
                          </label>
                          <textarea
                            rows="1"
                            class="form-control"
                            id="medUse"
                            name="medUse"
                            value={medUse}
                            placeholder="Enter use of medicine"
                            onChange={(e) => {
                              setMedUse(e.target.value);
                            }}
                          />
                        </div>
                        <br />
                        <div class="form-group d-flex">
                          <label className="fs-6 me-2" id="sty">
                            In Stock?<span>*</span>
                          </label>
                          <div class="custom-control custom-switch">
                            <input
                              type="checkbox"
                              style={{ width: "16px", height: "16px" }}
                              class="custom-control-input"
                              id="isInStock"
                              name="isInStock"
                              checked={isInStock}
                              onClick={() => setIsInStock(!isInStock)}
                            />
                          </div>
                        </div>
                        <br />
                        <div class="form-group d-flex justify-content-center">
                          <button
                            class="btn btn-success fs-6 mt-2 w-25"
                            type="submit"
                            onClick={handleForm}
                            style={{ fontSize: "15px" }}
                          >
                            Update
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
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
