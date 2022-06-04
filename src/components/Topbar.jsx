import React from "react";
import styled from "styled-components";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LanguageIcon from "@mui/icons-material/Language";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 50px;
  background-color: #ffffff;
  position: sticky;
  top: 0;
  z-index: 999;
`;

const Wrapper = styled.div`
  height: 100%;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Left = styled.div``;

const Logo = styled.span`
  font-size: 30px;
  font-weight: 700;
  color: #030376;
  cursor: pointer;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  position: relative;
  margin-left: 20px;
  cursor: pointer;
  color: #777;
  transition: all ease 0.3s;

  &:hover {
    color: #333;
  }
`;

const Badge = styled.span`
  width: 18px;
  height: 18px;
  font-size: 12px;
  background-color: #dd1717;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  position: absolute;
  top: -6px;
  right: -6px;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 20px;
  border: 2px solid rgba(0, 0, 0, 0.5);
  cursor: pointer;
  transition: all ease 0.3s;

  &:hover {
    opacity: 0.9;
  }
`;

const Topbar = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <Link to="/">
            <Logo>bean.admin</Logo>
          </Link>
        </Left>
        <Right>
          <IconWrapper>
            <NotificationsNoneIcon />
            <Badge>2</Badge>
          </IconWrapper>
          <IconWrapper>
            <LanguageIcon />
            <Badge>1</Badge>
          </IconWrapper>
          <IconWrapper>
            <SettingsIcon />
          </IconWrapper>
          <Avatar src="https://scontent.fhan4-2.fna.fbcdn.net/v/t1.6435-1/119217379_3295572814001063_7282101331774432594_n.jpg?stp=dst-jpg_p200x200&_nc_cat=111&ccb=1-6&_nc_sid=7206a8&_nc_ohc=2qU3CgC4ksYAX82I97F&tn=K8d5c1BpoCEyc0Fm&_nc_ht=scontent.fhan4-2.fna&oh=00_AT_TcbS7vaCc-tc82IpCmkmitbNqxqvUlTVCPetmwtgSsg&oe=629F9EB8" />
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Topbar;
