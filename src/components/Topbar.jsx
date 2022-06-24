import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LanguageIcon from "@mui/icons-material/Language";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";
import { persistor } from "../redux/store";

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

const Button = styled.button`
  padding: 10px 20px;
  background: none;
  outline: none;
  border: 1px solid #777;
  border-radius: 5px;
  margin-left: 20px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(0.95);
  }
`;

const Topbar = () => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    JSON.parse(localStorage.getItem("persist:root")) &&
      setAdmin(
        JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user)
          ?.currentUser
      );
  }, []);

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
          <Button
            onClick={() => {
              persistor.purge();
              setAdmin(null);
            }}
          >
            Log out
          </Button>
          {admin ? (
            <Avatar
              src={
                admin.img ||
                "https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png"
              }
            />
          ) : (
            <Button>
              <Link to="/login">LOG IN</Link>
            </Button>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Topbar;
