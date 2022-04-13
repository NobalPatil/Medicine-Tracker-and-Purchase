import axios from "axios";
import { useState } from "react";
import swal from "sweetalert";
import "bootstrap/dist/css/bootstrap.css";
import "../../CSS/Registration.css";
import { Link } from "react-router-dom";

export default function PharmacistRegistration() {
  const [pharmacistName, setPharmacistName] = useState("");
  const [pharmacyName, setPharmacyName] = useState("");
  const [pharmacyAddress, setPhmAddress] = useState("");
  const [pharmacyLatitude, setLat] = useState(0);
  const [pharmacyLongitude, setLng] = useState(0);
  const [pharmacistMobNo, setPhmMobno] = useState("");
  const [pharmacistEmailId, setPhmEmail] = useState("");
  const [pharmacistPassword, setPhmPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const getCoordinates = (position) => {
    setLat(position.coords.latitude);
    setLng(position.coords.longitude);
  };

  const regex =
    /^([a-zA-Z0-9_\.\-\ ])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  const regex1 = /^([a-zA-Z\ ])+$/;
  const regex2 = /^[6-9]{1}[0-9]{9}$/;

  const handleForm = (e) => {
    e.preventDefault();
    if (
      pharmacistName === "" ||
      pharmacyName === "" ||
      pharmacyAddress === "" ||
      pharmacistMobNo === "" ||
      pharmacistEmailId === "" ||
      pharmacistPassword === ""
    ) {
      swal("error", "please enter details", "error");
    } else if (!regex1.test(pharmacyName)) {
      swal("Error!", "Please Enter valid Name", "error");
    } else if (!regex.test(pharmacistEmailId)) {
      swal("Error!", "Please Enter Valid Email Address", "error");
    } else if (
      pharmacistPassword.length < 8 ||
      pharmacistPassword.length > 20
    ) {
      swal("Error!", "Password length is min 8 and max length is 20", "error");
    } else if (
      !regex2.test(pharmacistMobNo) ||
      pharmacistMobNo.length < 10 ||
      pharmacistMobNo.length > 10
    ) {
      swal("Error!!", "Please Enter valid mobile number", "error");
    } else if (confirmPassword != pharmacistPassword) {
      swal("Error!", "Password does not match", "error");
    } else {
      addPharmacist();
    }
  };

  const addPharmacist = () => {
    const pharma = {
      pharmacistName: pharmacistName,
      pharmacyName: pharmacyName,
      pharmacyAddress: pharmacyAddress,
      pharmacyLatitude: pharmacyLatitude,
      pharmacyLongitude: pharmacyLongitude,
      pharmacistMobNo: pharmacistMobNo,
      pharmacistEmailId: pharmacistEmailId,
      pharmacistPassword: pharmacistPassword,
    };

    axios
      .post("http://localhost:8081/register-pharmacist", pharma)
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
      {navigator.geolocation.getCurrentPosition(getCoordinates)}
      <div className="container mt-4 mb-4">
        <div className="row">
          <div className="col-2 "></div>
          <div className="col-8">
            <div className="row">
              <div className="col-2"></div>
              <div className="col-md-8">
                <div>
                  <form className="form-group">
                    <div className="inside-form mt-3 text-primary">
                      <center>
                        <h2>
                          <b>Pharmacist Registration</b>
                        </h2>
                      </center>
                    </div>
                    <br />
                    <div className="form-group ">
                      <label for="" id="sty" style={{ fontSize: "15px" }}>
                        Pharmacist Name <span>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="PharmacistName"
                        name="pharmacistName"
                        style={{ fontSize: "15px" }}
                        placeholder="Enter your name"
                        onChange={(e) => {
                          setPharmacistName(e.target.value);
                        }}
                      />
                    </div>

                    <div className="form-group ">
                      <label for="" id="sty" style={{ fontSize: "15px" }}>
                        Pharmacy Name <span>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="PharmacyName"
                        name="pharmacyName"
                        style={{ fontSize: "15px" }}
                        placeholder="Enter your pharmacy name"
                        onChange={(e) => {
                          setPharmacyName(e.target.value);
                        }}
                      />
                    </div>

                    <div className="form-group ">
                      <label for="" id="sty" style={{ fontSize: "15px" }}>
                        Pharmacy Address<span>*</span>
                      </label>
                      <textarea
                        className="form-control"
                        rows="1"
                        id="PharmacyAddress"
                        name="pharmacyAddress"
                        style={{ fontSize: "15px" }}
                        placeholder="Enter your pharmacy address"
                        onChange={(e) => {
                          setPhmAddress(e.target.value);
                        }}
                      ></textarea>
                    </div>
                    <br />
                    <div className="form-group ">
                      <label for="" id="sty" style={{ fontSize: "15px" }}>
                        Pharmacist Mobile No<span>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="PharmacistmobileNo"
                        name="pharmacistMobNo"
                        style={{ fontSize: "15px" }}
                        placeholder="Enter your contact no"
                        onChange={(e) => {
                          setPhmMobno(e.target.value);
                        }}
                      />
                    </div>

                    <div className="form-group ">
                      <label for="email" id="sty" style={{ fontSize: "15px" }}>
                        Email Id:<span>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        name="pharmacistEmailId"
                        style={{ fontSize: "15px" }}
                        placeholder="Enter your email"
                        onChange={(e) => {
                          setPhmEmail(e.target.value);
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
                        name="pharmacistPassword"
                        style={{ fontSize: "15px" }}
                        placeholder="Enter password"
                        onChange={(e) => {
                          setPhmPassword(e.target.value);
                        }}
                      />
                    </div>
                    <br />
                    <div className="form-group">
                      <label
                        for="confirmPassword"
                        id="sty"
                        style={{ fontSize: "15px" }}
                      >
                        Confirm Password:<span>*</span>
                      </label>
                      <input
                        type="password"
                        className="form-control p-2"
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
                        <Link
                          className="text-primary"
                          to="/login-page"
                          style={{ color: "black" }}
                        >
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
