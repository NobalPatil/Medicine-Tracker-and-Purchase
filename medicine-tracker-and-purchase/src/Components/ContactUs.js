import "bootstrap/dist/css/bootstrap.min.css";
import swal from "sweetalert";
import NavBar from "./CustomerComponents/CustomerNavBar";
import Footer from "./Footer";
import Navbar from "./PharmacistComponents/PharmacistNavBar";

function ContactUs() {
  return (
    <>
      {localStorage.getItem("customer") != null ||
      localStorage.getItem("pharmacist") != null ? (
        <div>
          {localStorage.getItem("customer") != null ? (
            <NavBar />
          ) : localStorage.getItem("pharmacist") != null ? (
            <Navbar />
          ) : (
            ""
          )}
          <div className="bg-light h-100">
            <img
              src="https://picsum.photos/1500/300"
              style={{ width: "100%" }}
            />
            <div
              className="d-flex flex-column align-items-center"
              style={{ fontFamily: "Block" }}
            >
              <br />
              <br />
              <br />
              <div>
                <h2 className="mt-4">
                  Our Offices
                  <hr />
                  <br />
                </h2>
              </div>
              <div className="text-center">
                <h6>
                  Aurangabad | T.V. Center, Hudco, Aurangabad, Contact no.
                  9857412658
                  <br />
                  <br />
                  Wardha | Ganesh nagar (Borgaon meghe) wardha, Contact no.
                  8875462154
                  <br />
                  <br />
                  Bhilai | Model Town,Nehru Nagar,Bhilai,C.G., Contact no.
                  9756482165
                  <br />
                  <br />
                  Jalgaon | Nhavi, Tal. Yawal, Dist. Jalgaon, Maharashtra,
                  Contact no. 8675485962
                  <br />
                  <br />
                  Jalgaon | Chitoda, Tal. Yawal, Dist. Jalgaon, Maharashtra,
                  Contact no. 7458961254
                </h6>
                <br />
                <br />
                <br />
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

export default ContactUs;
