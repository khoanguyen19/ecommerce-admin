import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const Layout = () => {
  return (
    <>
      <Topbar />
      <Container>
        <Sidebar />
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
