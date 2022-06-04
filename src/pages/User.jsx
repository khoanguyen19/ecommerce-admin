import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import UserShow from "../components/UserShow";
import UserUpdate from "../components/UserUpdate";

const Container = styled.div`
  flex: 4;
  color: black;
  margin: 10px 20px 0 20px;
  width: 100%;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h3`
  font-size: 22px;
`;

const CreateButton = styled.button`
  padding: 6px 20px;
  border: none;
  border-radius: 5px;
  background-color: #777;
  color: #ffffff;
  font-size: 16px;
  transition: all 0.3s ease-in;
  cursor: pointer;

  &:hover {
    background-color: #a4a0a0;
  }
`;

const UserWrapper = styled.div`
  display: flex;
  margin-top: 20px;
`;

const User = () => {
  return (
    <Container>
      <TitleWrapper>
        <Title>Edit User</Title>
        <Link to="/newUser">
          <CreateButton>Create</CreateButton>
        </Link>
      </TitleWrapper>
      <UserWrapper>
        <UserShow />
        <UserUpdate />
      </UserWrapper>
    </Container>
  );
};

export default User;
