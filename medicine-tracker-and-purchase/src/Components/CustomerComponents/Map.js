import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
import { useState } from "react";
import swal from "sweetalert";
import Footer from "../Footer";
import NavBar from "./CustomerNavBar";

export default function Map() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const pharmas = JSON.parse(localStorage.getItem("pharmas"));
  const medName = localStorage.getItem("medName");

  const containerStyle = {
    width: "100%",
    height: "100vh",
  };

  const mapStyles = [
    {
      featureType: "poi",
      elementType: "all",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
  ];

  const getCoordinates = (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  };

  const center = {
    lat: latitude,
    lng: longitude,
  };

  const showMedDetails = (pId) => {
    axios
      .post("http://localhost:8081/view-medicine", {
        medName: medName,
        pharmacistId: pId,
      })
      .then((res) => {
        if (Object.keys(res.data).length) {
          localStorage.setItem("searchedMedicine", JSON.stringify(res.data));
          window.location.href = "/order-medicine";
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
      {localStorage.getItem("customer") != null ? (
        <div>
          {navigator.geolocation.getCurrentPosition(getCoordinates)}
          <NavBar />
          <LoadScript googleMapsApiKey="AIzaSyD4HCa_y2CFkuZG7SzLx6FBu82AlRtxHWM">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
              options={{
                styles: mapStyles,
              }}
            >
              <Marker label="Your location" position={center} />
              {pharmas.map((pharmacist, index) => {
                return (
                  <Marker
                    key={index}
                    href="/order-medicine"
                    label={pharmacist.pharmacyName}
                    position={{
                      lat: pharmacist.pharmacyLatitude,
                      lng: pharmacist.pharmacyLongitude,
                    }}
                    onClick={() => showMedDetails(pharmacist.pharmacistId)}
                  />
                );
              })}
              <></>
            </GoogleMap>
          </LoadScript>
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
