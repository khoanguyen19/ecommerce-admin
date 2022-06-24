import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { getUsers, login } from "../redux/callApis";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #172b4d;
`;

const Logo = styled.span`
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #ffffff;
  cursor: pointer;
`;

const LoginWrapper = styled.div`
  width: 480px;
  height: 320px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: #f7fafc;
`;

const Input = styled.input`
  width: 280px;
  font-size: 16px;
  color: #adb5bd;
  margin-bottom: 20px;
  padding: 10px 12px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.09);
  box-shadow: 0 1px 3px rgb(50 50 93 / 15%), 0 1px 0 rgb(0 0 0 / 2%);
  outline: none;

  &::placeholder {
    color: #adb5bd;
  }
`;

const Button = styled.button`
  width: 100px;
  padding: 10px 20px;
  font-size: 16px;
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  color: #ffffff;
  background-color: #030376;
  cursor: pointer;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 7px 14px rgb(50 50 93 / 10%), 0 3px 6px rgb(0 0 0 / 8%);
  }
`;

const Login = () => {
  const checkAdmin =
    JSON.parse(localStorage.getItem("persist:root")) &&
    JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user)
      ?.currentUser?.isAdmin;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  const handleClick = async (e) => {
    e.preventDefault();
    const res = await login(dispatch, { username, password });
    console.log(res);
    checkAdmin && setAdmin(true);
  };

  return (
    <Container>
      <Navigate to="/" replace={true} />
      <Logo>BEAN.ADMIN</Logo>
      <LoginWrapper>
        <Input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleClick}>Login</Button>
        <span style={{ marginTop: "20px" }}>
          *Username: admin | Password: 123456
        </span>
      </LoginWrapper>
    </Container>
  );
};

export default Login;
