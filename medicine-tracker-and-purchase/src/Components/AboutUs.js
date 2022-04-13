import "bootstrap/dist/css/bootstrap.min.css";
import swal from "sweetalert";
import NavBar from "./CustomerComponents/CustomerNavBar";
import Navbar from "./PharmacistComponents/PharmacistNavBar";
import Footer from "./Footer";

function AboutUs() {
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
          <div className="row">
            <div className="col p-0 position-relative">
              <img
                src="https://picsum.photos/1500/300"
                style={{ width: "100%" }}
              />
              <div className="d-flex justify-content-center text-block display-1 fw-bold">
                <p>About Us</p>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center bg-light">
            <div>
              <div className="d-flex justify-content-center">
                <div className="" style={{ fontFamily: "Block" }}>
                  <br></br>

                  <br />

                  <h2>Who we are?</h2>
                  <p>
                    MedTracker has been providing you with genuine medicines
                    round-the-clock, through 24-hour pharmacies. <br />
                    And now through MedTracker, we intend to make your lives
                    easier – by helping you to find the medicines <br />
                    if you are trouble to find and also getting your medicines
                    delivered to you. Yes, no more stepping out to get your
                    <br />
                    medicines, no more standing in long queues, no more worrying
                    about the genuineness of medicines, no more sweat!
                  </p>
                  <br />
                  <h2>Services</h2>
                  <p>
                    Super-fast deliveries. In select cities, deliveries are done
                    in as less as 1 day
                    <br /> <br />
                    Largest pharmacy chain in India
                    <br /> <br />
                    Provides platform for pharmacists to grow their business
                    <br /> <br />
                    Easy to find medicines with the help of google map
                    <br /> <br />
                    Attractive deals on medicines
                    <br />
                  </p>
                  <br />
                  <br />
                </div>
                <br />
              </div>
            </div>
            <br></br>
            <br></br>
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

export default AboutUs;
