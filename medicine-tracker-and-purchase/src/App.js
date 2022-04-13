import React from "react";
import Map from "./Components/CustomerComponents/Map";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import OrderMedicine from "./Components/CustomerComponents/OrderMedicine";
import PharmacistHome from "./Components/PharmacistComponents/PharmacistHome";
import PharmacistRegistration from "./Components/PharmacistComponents/PharmacistRegistration";
import AdminHome from "./Components/AdminComponents/AdminHome";
import Login from "./Components/LoginPage";
import MedicineList from "./Components/PharmacistComponents/Medicines";
import CustomerHome from "./Components/CustomerComponents/CustomerHome";
import AboutUs from "./Components/AboutUs";
import ContactUs from "./Components/ContactUs";
import CustomerRegistration from "./Components/CustomerComponents/CustomerRegistration";
import UpdateMedicine from "./Components/PharmacistComponents/UpdateMedicine";
import OrderList from "./Components/PharmacistComponents/Orders";
import AddMedicine from "./Components/PharmacistComponents/AddMedicine";
import OrderHistory from "./Components/CustomerComponents/OrderHistory";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact={true} path="/" component={Login} />
        <Route exact={true} path="/login-page" component={Login} />
        <Route
          exact={true}
          path="/pharmacist-home"
          component={PharmacistHome}
        />
        <Route exact={true} path="/customer-home" component={CustomerHome} />
        <Route exact={true} path="/admin-home" component={AdminHome} />
        <Route exact={true} path="/medicines" component={MedicineList} />
        <Route exact={true} path="/orders" component={OrderList} />
        <Route
          exact={true}
          path="/update-medicine"
          component={UpdateMedicine}
        />
        <Route exact={true} path="/add-medicine" component={AddMedicine} />
        <Route exact={true} path="/google-map" component={Map} />
        <Route exact={true} path="/order-medicine" component={OrderMedicine} />
        <Route exact={true} path="/your-orders" component={OrderHistory} />
        <Route
          exact={true}
          path="/pharmacist-registration"
          component={PharmacistRegistration}
        />
        <Route
          exact={true}
          path="/customer-registration"
          component={CustomerRegistration}
        />
        <Route exact={true} path="/about-us" component={AboutUs} />
        <Route exact={true} path="/contact-us" component={ContactUs} />
      </Switch>
    </Router>
  );
}

export default App;
