import axios from "axios";
import { useEffect, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import swal from "sweetalert";

export default function AdminHome() {
  const [data, setData] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());

  const [click, setClick] = useState(false);

  const handleGraph = (e) => {
    setYear(e.target.name);
    axios
      .get(`http://localhost:8081/admin-earning/?year=${year}`)
      .then((res) => {
        setData(res.data);
      })
      .catch(() => swal("Something went wrong", "", "error", { timer: 2000 }));
  };

  const logout = () => {
    localStorage.setItem("adminId", null);
    localStorage.clear();
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8081/admin-earning/?year=${year}`)
      .then((res) => {
        setData(res.data);
      });
  });

  return (
    <>
      {localStorage.getItem("adminId") != null ? (
        <div>
          <nav className="navbar navbar-dark bg-dark p-0">
            <div className="nav-container d-flex justify-content-between">
              <h4 className="ps-4" style={{ color: "orange" }}>
                ]^[ e d T r a c k e r
              </h4>
              <h5 className="text-light">A D M I N</h5>
              <ul className={click ? "nav-menu active" : "nav-menu"}>
                <li>
                  <NavLink
                    exact
                    to="/login-page"
                    activeClassName="active"
                    className="nav-links text-warning"
                    onClick={logout}
                  >
                    Logout
                  </NavLink>
                </li>
              </ul>
              <div className="nav-icon">
                <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
              </div>
            </div>
          </nav>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="w-100 ps-5 mt-3 d-flex justify-content-start">
              <DropdownButton id="years" title="Select Year">
                <Dropdown.Item name={2020} onClick={handleGraph}>
                  2020
                </Dropdown.Item>
                <Dropdown.Item name={2021} onClick={handleGraph}>
                  2021
                </Dropdown.Item>
                <Dropdown.Item name={2022} onClick={handleGraph}>
                  2022
                </Dropdown.Item>
              </DropdownButton>
            </div>
            <div>
              <h3>STATISTICS OF EARNING PER MONTH</h3>
              <h4>From Commission Per Order Of Medicine.</h4>
              <br />
            </div>
            <div style={{ width: "60%", height: 400 }}>
              <ResponsiveContainer>
                <AreaChart
                  data={data}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis aria-label="Commission per Orders" />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="earning"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <h4>Year : {year}</h4>
          </div>
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
