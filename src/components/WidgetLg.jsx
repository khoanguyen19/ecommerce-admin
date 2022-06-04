import React, { useState, useEffect } from "react";
import { userRequest } from "../requestMethods";
import styled from "styled-components";
import { format } from "timeago.js";

const Container = styled.div`
  flex: 2;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px -1px rgba(0, 0, 0, 0.25);
`;

const Title = styled.h3`
  font-size: 22px;
`;

const Table = styled.table`
  width: 100%;
  border-spacing: 20px;
`;

const Thead = styled.thead``;

const Tr = styled.tr``;

const Tbody = styled.tbody``;

const Th = styled.th`
  text-align: left;
`;

const Td = styled.td``;

const TdCustomer = styled(Td)`
  display: flex;
  align-items: center;
`;

const Img = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border-radius: 50%;
  object-fit: cover;
`;

const Name = styled.span`
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ApprovedButton = styled.button`
  width: 74px;
  padding: 8px 10px;
  border-radius: 5px;
  border: none;
  background-color: #50ebb0;
`;

const RejectedButton = styled(ApprovedButton)`
  background-color: #e3c5c7;
`;

const PendingButton = styled(ApprovedButton)`
  background-color: #d8dfef;
`;

const WidgetLg = () => {
  // const [users, setUsers] = useState([])
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("/order/find");
        setOrders(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  const Button = ({ type }) => {
    if (type === "Pending") {
      return <PendingButton>{type}</PendingButton>;
    } else if (type === "Approved") {
      return <ApprovedButton>{type}</ApprovedButton>;
    } else {
      return <RejectedButton>{type}</RejectedButton>;
    }
  };

  return (
    <Container>
      <Title>Latest Transactions</Title>
      <Table>
        <Thead>
          <Tr>
            <Th>Customer</Th>
            <Th>Date</Th>
            <Th>Total</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders
            .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
            .map((order) => (
              <Tr key={order._id}>
                <TdCustomer>
                  <Img
                    src={
                      order.userInfo[0].img ||
                      "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
                    }
                  />
                  <Name>{order.userInfo[0].username}</Name>
                </TdCustomer>
                <Td>{format(order.createdAt, "en_US")}</Td>
                <Td>{order.amount}</Td>
                <Td>
                  <Button type={order.status} />
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Container>
  );
};

export default WidgetLg;
