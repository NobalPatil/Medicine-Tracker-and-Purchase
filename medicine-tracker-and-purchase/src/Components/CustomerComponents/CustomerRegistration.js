import axios from "axios";
import { useState } from "react";
import swal from "sweetalert";
import "bootstrap/dist/css/bootstrap.css";
import "../../CSS/Registration.css";
import { Link } from "react-router-dom";

export default function CustomerRegistration() {
  const [custName, setCustName] = useState("");
  const [custAddress, setCustAddress] = useState("");
  const [custMobNo, setCustMobno] = useState("");
  const [custEmailId, setCustEmail] = useState("");
  const [custPassword, setCustPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const regex =
    /^([a-zA-Z0-9_\.\-\ ])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  const regex1 = /^([a-zA-Z\ ])+$/;
  const regex2 = /^[6-9]{1}[0-9]{9}$/;

  const handleForm = (e) => {
    e.preventDefault();
    if (
      custName === "" ||
      custAddress === "" ||
      custMobNo === "" ||
      custEmailId === "" ||
      custPassword === ""
    ) {
      swal("Error!", "Please enter details", "error");
    } else if (!regex1.test(custName)) {
      swal("Error!", "Please enter valid name", "error");
    } else if (!regex.test(custEmailId)) {
      swal("Error!", "Please enter valid email address", "error");
    } else if (custPassword.length < 8 || custPassword.length > 20) {
      swal("Error!", "Password length is min 8 and max length is 20", "error");
    } else if (
      !regex2.test(custMobNo) ||
      custMobNo.length < 10 ||
      custMobNo.length > 10
    ) {
      swal("Error!", "Please enter valid mobile number", "error");
    } else if (confirmPassword != custPassword) {
      swal("Error!", "Password does not match", "error");
    } else {
      addCustomer();
    }
  };

  const addCustomer = () => {
    const customer = {
      custName: custName,
      custAddress: custAddress,
      custMobNo: custMobNo,
      custEmailId: custEmailId,
      custPassword: custPassword,
    };

    axios
      .post("http://localhost:8081/register-customer", customer)
      .then((res) => {
        if (Object.keys(res.data).length) {
          swal(
            "success",
            " Your Registration Completed Successfully",
            "success",
            {
              timer: 2000,
            }
          ).then(() => (window.location.href = "/login-page"));
        } else
           swal(
            "Error",
            "This Email Id or Mobile No. had been already registered",
            "error",
            {
              timer: 2000,
            }
          );
      })
      .catch(() =>
        swal("Error", "Something went wrong, please try again", "error", {
          timer: 2000,
        })
      );
  };

  return (
    <>
      <div className="container mt-4 mb-4">
        <div className="row">
          <div className="col-2 "></div>
          <div className="col-8">
            <div className="row">
              <div className="col-2"></div>
              <div className="col-md-8">
                <div>
                  <form className="form-group">
                    <div
                      className="inside-form mt-3 text-primary"
                      style={{ color: "dark" }}
                    >
                      <center>
                        <h2>
                          <b>Customer Registration</b>
                        </h2>
                      </center>
                    </div>{" "}
                    <br />
                    <div className="form-group">
                      <label for="" id="sty" style={{ fontSize: "15px" }}>
                        Customer Name <span>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="CustomerName"
                        name="customerName"
                        style={{ fontSize: "15px" }}
                        placeholder="Enter your name"
                        onChange={(e) => {
                          setCustName(e.target.value);
                        }}
                      />
                    </div>
                    <div className="form-group ">
                      <label for="" id="sty" style={{ fontSize: "15px" }}>
                        Customer Address<span>*</span>
                      </label>
                      <textarea
                        className="form-control"
                        rows="1"
                        id="CustomerAddress"
                        name="customerAddress"
                        style={{ fontSize: "15px" }}
                        placeholder="Enter your address"
                        onChange={(e) => {
                          setCustAddress(e.target.value);
                        }}
                      ></textarea>
                    </div>
                    <br />
                    <div className="form-group ">
                      <label for="" id="sty" style={{ fontSize: "15px" }}>
                        Customer Mobile No.<span>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="CustomerMobileNo"
                        name="customerMobNo"
                        style={{ fontSize: "15px" }}
                        placeholder="Enter your contact no"
                        onChange={(e) => {
                          setCustMobno(e.target.value);
                        }}
                      />
                    </div>
                    <div className="form-group ">
                      <label for="email" id="sty" style={{ fontSize: "15px" }}>
                        Email Id:<span>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control p-2"
                        id="email"
                        name="customerEmailId"
                        style={{ fontSize: "15px" }}
                        placeholder="Enter your email"
                        onChange={(e) => {
                          setCustEmail(e.target.value);
                        }}
                      />
                    </div>
                    <div className="form-group ">
                      <label
                        for="password"
                        id="sty"
                        style={{ fontSize: "15px" }}
                      >
                        Password:<span>*</span>
                      </label>
                      <input
                        type="password"
                        className="form-control p-2"
                        id="password"
                        name="customerPassword"
                        style={{ fontSize: "15px" }}
                        placeholder="Enter password"
                        onChange={(e) => {
                          setCustPassword(e.target.value);
                        }}
                      />
                    </div>
                    <br />
                    <div className="form-group ">
                      <label
                        for="confirmPassword"
                        id="sty"
                        style={{ fontSize: "15px" }}
                      >
                        Confirm Password:<span>*</span>
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                        }}
                        style={{ fontSize: "15px" }}
                        placeholder="Confirm password"
                      />
                    </div>
                    <br />
                    <div className="form-group d-flex">
                      <button
                        className="btn btn-success mt-2"
                        type="submit"
                        onClick={handleForm}
                        style={{ fontSize: "15px" }}
                      >
                        Submit
                      </button>
                      <div
                        className="d-flex align-items-center ms-3"
                        id="sty"
                        style={{ fontSize: "15px" }}
                      >
                        <label>Already have account ? </label>
                        <Link className="text-primary" to="/login-page">
                          Login Here
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
