import React from "react";
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { UserStoreContext} from '../context/UserContext'

//redux
import { useDispatch } from 'react-redux'
import { updateProfile } from "../redux/actions/authAction";


const schema = yup.object().shape({
 // name: yup.string().required("ชื่อสกุลห้ามว่าง"),
  email: yup
    .string()
    .required("อีเมล์ห้ามว่าง")
    .email("รูปแบบอีเมล์ไม่ถูกต้อง"),
  password: yup
    .string()
    .required("รหัสผ่านห้ามว่าง")
    .min(3, "รหัสผ่านต้องอย่างน้อย 3 ตัวอักษรขึ้นไป"),
});

const LoginPage = () => {
  const history = useHistory();
  const { addToast } = useToasts();
  //const userStore = React.useContext(UserStoreContext)

  //call redux action
  const dispatch = useDispatch()








  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    try {
      const apiUrl = "https://api.codingthailand.com/api/login";
      const resp = await axios.post(apiUrl, {
        email: data.email,
        password: data.password,
      });
      localStorage.setItem('token',JSON.stringify(resp.data))
      console.log(resp.data);

      //getprofile
      const urlProfile = 'https://api.codingthailand.com/api/profile'
      const respProfile = await axios.get(urlProfile,{
          headers: {
              Authorization: 'bearer' + resp.data.access_token
          }
      })
      console.log(respProfile.data.data.user)
      localStorage.setItem('profile',JSON.stringify(respProfile.data.data.user))
      addToast('เข้าสู่ระบบเรียบร้อยแล้ว', { appearance: "success" });
      
     // history.replace("/");
     // history.go(0)
      // update profile by protext

      const profileValue = JSON.parse(localStorage.getItem('profile'))
     // userStore.updateProfile(profileValue)

     dispatch(updateProfile(profileValue))



      history.replace('/')

    } catch (error) {
      addToast(error.response.data.message, {
        appearance: "error",
      });
    }
  };

  return (
    <div className="container mt-3">
      <Row>
        <Col xs={12} md={8}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                ref={register}
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
              />
              {errors.email && (
                <Form.Control.Feedback type="invalid">
                  {errors.email.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                ref={register}
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
              />
              {errors.password && (
                <Form.Control.Feedback type="invalid">
                  {errors.password.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Col>
        <hr />
      </Row>
    </div>
  );
};

export default LoginPage;
