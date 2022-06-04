import React from "react";
import styled from "styled-components";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Container = styled.div`
  flex: 1;
  padding: 20px;
  margin-right: 30px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px -1px rgba(0, 0, 0, 0.25);
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
`;

const UsernameWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Username = styled.span`
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Title = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: #777;
`;

const UserDetails = styled.div``;

const DetailsContainer = styled.div`
  margin: 20px 0;
`;

const DetailsTitle = styled.span`
  font-size: 14px;
  color: #a3a3a3;
  font-weight: 600;
`;

const Detail = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const Text = styled.span`
  font-size: 14px;
  margin-left: 6px;
`;

const UserShow = () => {
  const location = useLocation();
  const userId = location.pathname.split("/")[2];

  const user = useSelector((state) =>
    state.users.users.find((u) => u._id === userId)
  );

  return (
    <Container>
      <UserInfo>
        <Avatar src={user.img} />
        <UsernameWrapper>
          <Username>{user.username}</Username>
          <Title>Developer</Title>
        </UsernameWrapper>
      </UserInfo>
      <UserDetails>
        <DetailsContainer>
          <DetailsTitle>Account Details</DetailsTitle>
          <Detail>
            <PersonOutlineOutlinedIcon />
            <Text>{user.username}</Text>
          </Detail>
          <Detail>
            <CalendarMonthIcon />
            <Text>19.06.2001</Text>
          </Detail>
        </DetailsContainer>
        <DetailsContainer>
          <DetailsTitle>Account Details</DetailsTitle>
          <Detail>
            <PhoneAndroidOutlinedIcon />
            <Text>076 360 2013</Text>
          </Detail>
          <Detail>
            <EmailOutlinedIcon />
            <Text>{user.email}</Text>
          </Detail>
          <Detail>
            <GpsFixedIcon />
            <Text>Danang, Vietnam</Text>
          </Detail>
        </DetailsContainer>
      </UserDetails>
    </Container>
  );
};

export default UserShow;
