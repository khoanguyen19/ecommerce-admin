import React from "react";
import styled from "styled-components";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InsightsIcon from "@mui/icons-material/Insights";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import DynamicFeedOutlinedIcon from "@mui/icons-material/DynamicFeedOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import ReportOutlinedIcon from "@mui/icons-material/ReportOutlined";
import { Link } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  height: calc(100vh - 50px);
  background-color: rgb(251, 251, 255);
  border-radius: 15px;
  margin-top: 10px;
  display: sticky;
`;

const Wrapper = styled.div`
  padding: 20px;
`;

const Menu = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.h3`
  color: #a3a3a3;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
`;

const List = styled.ul`
  list-style: none;
  color: #555;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  margin-left: 12px;
  padding: 4px 6px;
  font-size: 14px;
  transition: all ease 0.3s;
  border-radius: 10px;
  cursor: ${(props) => (props.disabled ? "auto" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.3 : 1)};

  &:hover {
    background-color: ${(props) =>
      props.disabled ? "transparent" : "rgb(228, 228, 232)"};
  }
`;

const Text = styled.span`
  margin-left: 4px;
  color: #555;
`;

const StyledLink = styled(Link)`
  margin-left: 4px;
  color: #555;
  display: inline-block;
  width: 100%;
`;

const Sidebar = () => {
  return (
    <Container>
      <Wrapper>
        <Menu>
          <Title>Dashboard</Title>
          <List>
            <ListItem>
              <HomeOutlinedIcon />
              <StyledLink to="/">Home</StyledLink>
            </ListItem>
            <ListItem disabled>
              <InsightsIcon />
              <Text>Analytics</Text>
            </ListItem>
            <ListItem disabled>
              <EqualizerIcon />
              <Text>Sales</Text>
            </ListItem>
          </List>
        </Menu>

        <Menu>
          <Title>Quick Menu</Title>
          <List>
            <ListItem>
              <PersonOutlineOutlinedIcon />
              <StyledLink to="/users">Users</StyledLink>
            </ListItem>
            <ListItem>
              <Inventory2OutlinedIcon />
              <StyledLink to="/products">Products</StyledLink>
            </ListItem>
            <ListItem disabled>
              <AttachMoneyOutlinedIcon />
              <Text>Transactions</Text>
            </ListItem>
            <ListItem disabled>
              <AssessmentOutlinedIcon />
              <Text>Reports</Text>
            </ListItem>
          </List>
        </Menu>

        <Menu>
          <Title>Notification</Title>
          <List>
            <ListItem disabled>
              <MailOutlinedIcon />
              <Text>Mail</Text>
            </ListItem>
            <ListItem disabled>
              <DynamicFeedOutlinedIcon />
              <Text>Feedback</Text>
            </ListItem>
            <ListItem disabled>
              <ChatBubbleOutlineOutlinedIcon />
              <Text>Messages</Text>
            </ListItem>
          </List>
        </Menu>

        <Menu>
          <Title>Staff</Title>
          <List>
            <ListItem disabled>
              <WorkOutlineOutlinedIcon />
              <Text>Manage</Text>
            </ListItem>
            <ListItem disabled>
              <InsightsIcon />
              <Text>Analytics</Text>
            </ListItem>
            <ListItem disabled>
              <ReportOutlinedIcon />
              <Text>Reports</Text>
            </ListItem>
          </List>
        </Menu>
      </Wrapper>
    </Container>
  );
};

export default Sidebar;
