import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import Navbar from "./PharmacistNavBar";
import Footer from "../Footer";

export default function AddMedicine() {
  const [medName, setMedName] = useState("");
  const [medManufacturer, setMedManufacturer] = useState("");
  const [medCost, setMedCost] = useState(0);
  const [medUse, setMedUse] = useState("");
  const [isInStock, setIsInStock] = useState(false);

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
      addMedicine();
    }
  };

  const addMedicine = () => {
    const med = {
      medName: medName,
      medManufacturer: medManufacturer,
      medCost: medCost,
      medUse: medUse,
      isInStock: isInStock,
      pharmacist: JSON.parse(localStorage.getItem("pharmacist")),
    };

    axios
      .post("http://localhost:8081/add-medicine", med)
      .then((res) => {
        if (Object.keys(res.data).length) {
          swal("success", " Medicine added Successfully!", "success", {
            timer: 2000,
          }).then(() => (window.location.href = "/add-medicine"));
        } else
          swal("Something went wrong", "Please try again!", "error", {
            timer: 2000,
          });
      })
      .catch(() =>
        swal("Something went wrong", "Please try again!", "error", {
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
                    <div>
                      <form class="form-group">
                        <div class="inside-form mt-3 text-primary">
                          <center>
                            <h2>
                              <b>Add Medicines</b>
                            </h2>
                          </center>
                        </div>
                        <br />
                        <div class="form-group">
                          <label className="fs-6" for="" id="sty">
                            Medicine Name <span>*</span>
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="medName"
                            name="medName"
                            placeholder="Enter medicine name"
                            onChange={(e) => {
                              setMedName(e.target.value);
                            }}
                          />
                        </div>
                        <div class="form-group ">
                          <label className="fs-6" for="" id="sty">
                            Manufacturer Name <span>*</span>
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="medManufacturer"
                            name="medManufacturer"
                            placeholder="Enter medicine manufacturer name"
                            onChange={(e) => {
                              setMedManufacturer(e.target.value);
                            }}
                          />
                        </div>
                        <div class="form-group ">
                          <label className="fs-6" for="" id="sty">
                            Medicine Cost (per strip/item)<span>*</span>
                          </label>
                          <input
                            class="form-control p-2"
                            type="number"
                            id="medCost"
                            name="medCost"
                            placeholder="Enter medicine cost (Rs.)"
                            onChange={(e) => {
                              setMedCost(e.target.value);
                            }}
                          ></input>
                        </div>
                        <br />
                        <div class="form-group ">
                          <label className="fs-6" for="" id="sty">
                            Medicine Use<span>*</span>
                          </label>
                          <textarea
                            rows="1"
                            class="form-control"
                            id="medUse"
                            name="medUse"
                            placeholder="Enter use of medicine"
                            onChange={(e) => {
                              setMedUse(e.target.value);
                            }}
                          />
                        </div>
                        <br />
                        <div class="form-group d-flex">
                          <label className="fs-6 me-2" for="" id="sty">
                            In Stock?<span>*</span>
                          </label>

                          <div class="custom-control custom-switch">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              style={{ width: "16px", height: "16px" }}
                              id="isInStock"
                              name="isInStock"
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
                            Add
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
