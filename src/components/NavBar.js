import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { NavLink, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserStoreContext } from "../context/UserContext";
//redux
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../redux/actions/authAction";

const NavBar = () => {
  const history = useHistory();
  // const [profile, setProfile] = useState(null)

  const userStore = React.useContext(UserStoreContext);

  //redux
  const profileRedux = useSelector((state) => state.authReducer.profile);
  const total = useSelector((state) => state.cartReducer.total)

  const dispatch = useDispatch();

  // const getProfile = () =>{
  //   const profileValue = JSON.parse(localStorage.getItem('profile'))
  //   if (profileValue){
  //     setProfile(profileValue)
  //   }
  // }
  // React.useEffect(() => {
  //  console.log('use effet navbar')
  //  getProfile()

  // }, [])

  //  const getProfile = () =>{
  //     const profileValue = JSON.parse(localStorage.getItem('profile'))
  //     if (profileValue){
  //       userStore.updateProfile(profileValue)
  //     }
  //   }
  //   React.useEffect(() => {
  //    console.log('use effet navbar')
  //    getProfile()

  //   }, [])

  //redux
  const getProfile = () => {
    const profileValue = JSON.parse(localStorage.getItem("profile"));
    if (profileValue) {
      dispatch(updateProfile(profileValue));
    }
  };
  React.useEffect(() => {
    console.log("use effet navbar");
    getProfile();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
    history.replace("/");
    //history.go(0)
    // userStore.updateProfile(null)
    dispatch(updateProfile(null));
  };
  return (
    <>
      <Navbar bg="success" expand="lg">
        <NavLink className="navbar-brand" to="/" exact>
          <img
            src="./logo192.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Phangnga Technical College"
          />
          {"    "} Phangnga
        </NavLink>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">

            <NavLink className="nav-link" to="/" exact activeClassName="active">
              หน้าหลัก
            </NavLink>

            <NavLink className="nav-link" to="/product" activeClassName="active">
              สินค้า
            </NavLink>

            <NavLink className="nav-link" to="/about" activeClassName="active">
              เกี่ยวกับเรา
            </NavLink>

            <NavLink className="nav-link" to="/cart" activeClassName="active">
              ตะกร้าสินค้า {total} ชิ้น
            </NavLink>

            <NavDropdown
              title="Workshop (Pagination + CRUD"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item
                onClick={() => {
                  history.replace("/hospital");
                }}
              >
                ข้อมูลสถานพยาบาล
              </NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={() => {
                  history.replace("/category");
                }}
              >
                หมวดหมู่ข่าว (CRUD)
              </NavDropdown.Item>
            </NavDropdown>

            <NavLink className="nav-link" to="/upload" activeClassName="active">
              Upload file
            </NavLink>
             <NavLink className="nav-link" to="/chart" activeClassName="active">
              รายงาน chart
            </NavLink>
            <NavLink className="nav-link" to="/member" activeClassName="active">
              เมนูสมาชิก
            </NavLink>
          </Nav>

          {profileRedux ? (
            <span className="navbar-text text-white">
              ยินดีต้อนรับคุณ {profileRedux.name}
              role : {} {profileRedux.role}
              <button className="btn btn-danger ml-2" onClick={logout}>
                log out
              </button>
            </span>
          ) : (
            <>
              <Nav>
                <NavLink
                  className="nav-link"
                  to="/register"
                  activeClassName="active"
                >
                  สมัครสมาชิก
                </NavLink>
                <NavLink
                  className="nav-link"
                  to="/login"
                  activeClassName="active"
                >
                  เข้าระบบ
                </NavLink>
              </Nav>
            </>
          )}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavBar;
