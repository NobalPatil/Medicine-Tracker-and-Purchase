import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../CSS/LoginPage.css";
import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import loginPageImg from "../Images/med1.jpg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const regex =
    /^([a-zA-Z0-9_\.\-\ ])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  const handleForm = (e) => {
    e.preventDefault();
    if (email === "") {
      swal("Error!", "Please enter valid details", "error");
    } else if (!regex.test(email)) {
      swal("Error!", "Please enter valid email address", "error");
    } else if (password == "") {
      swal("Error!", "Please enter password", "error");
    } else if (password.length < 8 || password.length > 20) {
      swal("Error!", "Password length is min 8 and max length is 20", "error");
    } else {
      checkUser();
    }
  };

  const checkUser = () => {
    let user = { emailId: email, password: password };

    if (role === "admin") {
      axios
        .post("http://localhost:8081/login-admin", user)
        .then((res) => {
          if (res.data != "") {
            localStorage.setItem("adminId", res.data.adminId);
            swal("success", "Successfully Login, Welcome Admin!!", "success", {
              timer: 2000,
            }).then(() => (window.location.href = "/admin-home"));
          } else {
            swal(
              "Invalid Email Id or Password",
              "Please enter valid details",
              "error",
              {
                timer: 2000,
              }
            );
          }
        })
        .catch(() =>
          swal(
            "Error",
            "Something went wrong, please try after some time",
            "error",
            {
              timer: 2000,
            }
          )
        );
    } else if (role === "customer") {
      axios
        .post("http://localhost:8081/login-customer", user)
        .then((res) => {
          if (res.data != "") {
            localStorage.setItem("customer", JSON.stringify(res.data));
            swal(
              "success",
              "Successfully Login, Welcome Customer!!",
              "success",
              {
                timer: 2000,
              }
            ).then(() => (window.location.href = "/customer-home"));
          } else {
            swal(
              "Invalid Email Id or Password",
              "Please enter valid details",
              "error",
              {
                timer: 2000,
              }
            );
          }
        })
        .catch(() =>
          swal(
            "Error",
            "Something went wrong, please try after some time",
            "error",
            {
              timer: 2000,
            }
          )
        );
    } else if (role === "pharmacist") {
      axios
        .post("http://localhost:8081/login-pharmacist", user)
        .then((res) => {
          if (res.data != "") {
            localStorage.setItem("pharmacist", JSON.stringify(res.data));
            swal(
              "success",
              "Successfully Login, Welcome Pharmacist!!",
              "success",
              {
                timer: 2000,
              }
            ).then(() => (window.location.href = "/pharmacist-home"));
          } else {
            swal(
              "Invalid Email Id or Password",
              "Please enter valid details",
              "error",
              {
                timer: 2000,
              }
            );
          }
        })
        .catch(() =>
          swal(
            "Error",
            "Something went wrong, please try after some time",
            "error",
            {
              timer: 2000,
            }
          )
        );
    } else {
      swal("User Role?", "Please select your role !", "error", {
        timer: 2000,
      });
    }
  };

  return (
    <>
      <div className="main">
        <div>
          <div className="row">
            <div className="col-6 mt-3">
              <h1 className="fw-bold text-secondary p-4 ms-5">
                Medicine Tracker and Purchase
              </h1>
              <img src={loginPageImg} style={{ width: "900px" }} />
            </div>
            <div className="col-6 mt-5">
              <div className="row ">
                <div className="d-flex justify-content-center">
                  <form>
                    <br />
                    <br />
                    <div className="d-flex justify-content-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="50"
                        height="50"
                        fill="currentColor"
                        className="bi bi-person-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                      </svg>
                    </div>
                    <br />
                    <div
                      className="inside-form mt-3"
                      style={{ color: "black" }}
                    ></div>
                    <div className="row ms-1">
                      <div className="col-sm-4">
                        <input
                          type="radio"
                          className="btn-check btn-check-secondary"
                          name="options"
                          id="option1"
                          value="admin"
                          onClick={(e) => {
                            setRole(e.target.value);
                          }}
                        />
                        <label
                          className="btn btn-secondary w-100"
                          for="option1"
                        >
                          Admin
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input
                          type="radio"
                          className="btn-check"
                          name="options"
                          id="option2"
                          value="customer"
                          onClick={(e) => {
                            setRole(e.target.value);
                          }}
                        />
                        <label
                          className="btn btn-secondary w-100"
                          for="option2"
                        >
                          Customer
                        </label>
                      </div>
                      <div class="col-sm-4">
                        <input
                          type="radio"
                          className="btn-check"
                          name="options"
                          id="option3"
                          value="pharmacist"
                          onClick={(e) => {
                            setRole(e.target.value);
                          }}
                        />
                        <label
                          className="btn btn-secondary w-100"
                          for="option3"
                        >
                          Pharmacist
                        </label>
                      </div>
                    </div>
                    <div className="form-group mt-4">
                      <input
                        type="email"
                        className="form-control m-2"
                        placeholder="Email"
                        aria-label="Email"
                        name="Email"
                        id="email"
                        aria-describedby="inputGroup-sizing-sm"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-group mt-2">
                      <input
                        type="password"
                        className="form-control m-2"
                        placeholder="Password"
                        aria-label="password"
                        name="Pass"
                        id="pass"
                        size="8"
                        aria-describedby="inputGroup-sizing-sm"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-group mt-3">
                      <div className="d-flex justify-content-center">
                        <button
                          className="btn btn-danger w-25 m-2"
                          type="button"
                          onClick={(checkUser, handleForm)}
                        >
                          Login
                        </button>
                      </div>
                      <br />
                      <div className="ms-3">
                        <Link
                          to="/pharmacist-registration"
                          className="btn btn-outline-dark m-2"
                        >
                          Sign-Up as Pharmacist
                        </Link>
                        <Link
                          to="/customer-registration"
                          className="btn btn-outline-dark m-2 pe-3"
                        >
                          Sign-Up as Customer
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
