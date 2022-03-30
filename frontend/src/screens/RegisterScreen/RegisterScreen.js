import React, { useState, useEffect, useRef, useDebugValue } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
// import { register } from "../../actions/userActions";
import MainScreen from "../../components/MainScreen";
import "./RegisterScreen.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";

function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [gotPic, setGotPic] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  // const dispatch = useDispatch();

  // const userRegister = useSelector((state) => state.userRegister);
  // const { loading, error, userInfo } = userRegister;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const postDetails = (pics) => {
    setGotPic(false);
    // console.log(pics);
    if (
      pics ===
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    ) {
      return setPicMessage("Please Select an Image");
    }
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "notezipper");
      data.append("cloud_name", "dykmiet9x");
      fetch("https://api.cloudinary.com/v1_1/dykmiet9x/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPic(data.url.toString());
          setGotPic(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setGotPic(true);
      return setPicMessage("Please Select an Image");
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/mynotes");
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(email, name);
    if (password !== confirmpassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(name, email, password, pic));
      //   setMessage(null);
      //   try {
      //     const config = {
      //       headers: {
      //         "Content-type": "application/json",
      //       },
      //     };
      //     setLoading(true);
      //     const { data } = await axios.post(
      //       "api/users",
      //       { name, pic, email, password },
      //       config
      //     );
      //     console.log(data);
      //     localStorage.setItem("userInfo", JSON.stringify(data));
      //     setLoading(false);
      //   } catch (error) {
      //     setLoading(false);
      //     setError(error.response.data.message);
      //   }
    }
  };

  return (
    <MainScreen title="REGISTER">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
        {!gotPic && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              value={name}
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmpassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          {picMessage && (
            <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
          )}
          <Form.Group controlId="pic">
            <Form.Label>Profile Picture</Form.Label>
            {/* <Form.File
              onChange={(e) => postDetails(e.target.files[0])}
              id="custom-file"
              type="image/png"
              label="Upload Profile Picture"
              custom
            /> */}

            <div className="input-group" style={{ width: "200px" }}>
              <div className="custom-file" style={{ width: "100px" }}>
                <input
                  onChange={(e) => postDetails(e.target.files[0])}
                  // onChange={(e) => console.log(e.target.value)}
                  type="file"
                  className="custom-file-input"
                  id="inputGroupFile01"
                  aria-describedby="inputGroupFileAddon01"
                />
                <label
                  className="custom-file-label"
                  htmlFor="inputGroupFile01"
                  style={{ width: "auto" }}
                >
                  Choose file
                </label>
              </div>
            </div>
          </Form.Group>

          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            Have an Account ? <Link to="/login">Login</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
}

export default RegisterScreen;
