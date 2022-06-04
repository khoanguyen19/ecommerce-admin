import React, { useEffect, useState } from "react";
import styled from "styled-components";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { userRequest } from "../requestMethods";

const Container = styled.div`
  flex: 1;
  padding: 30px;
  margin-right: 30px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px -1px rgba(0, 0, 0, 0.25);
`;

const Title = styled.h3`
  font-size: 22px;
`;

const MemberList = styled.ul`
  list-style: none;
`;

const MemberListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;

const MemberImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const MemberWrapper = styled.div`
  display: flex;
  width: 120px;
  flex-direction: column;
`;

const MemberName = styled.p`
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MemberTitle = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #777;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  padding: 8px 10px;
  border: 1px solid transparent;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border: 1px solid #333;
  }
`;

const DisplayIcon = styled(VisibilityIcon)`
  font-size: 18px !important;
  margin-right: 4px;
`;

const WidgetSm = () => {
  const titleArray = ["Artist", "Developer", "Manager", "Saler", "Maketer"];

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("/user/find?new=true");
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  return (
    <Container>
      <Title>New Join Members</Title>
      <MemberList>
        {users.map((user) => {
          return (
            <MemberListItem key={user._id}>
              <MemberImg
                src={user.img || "https://genvita.vn/Content/images/avatar.png"}
              />
              <MemberWrapper>
                <MemberName>{user.username}</MemberName>
                <MemberTitle>
                  {titleArray[Math.floor(Math.random() * titleArray.length)]}
                </MemberTitle>
              </MemberWrapper>
              <Button>
                <DisplayIcon /> Preview
              </Button>
            </MemberListItem>
          );
        })}
      </MemberList>
    </Container>
  );
};

export default WidgetSm;
