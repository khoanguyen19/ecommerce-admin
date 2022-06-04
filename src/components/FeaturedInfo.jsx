import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { userRequest } from "../requestMethods";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 14px;
`;

const ItemWrapper = styled.div`
  flex: 1;
  margin: 0 20px;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px -1px rgba(0, 0, 0, 0.25);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 0px 11px 1px rgba(0, 0, 0, 0.34);
  }
`;

const Title = styled.span`
  font-size: 24px;
  font-weight: 600;
`;

const MoneyWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const Money = styled.span`
  font-size: 24px;
  font-weight: 700;
  margin-right: 12px;
`;

const MoneyRate = styled.span`
  font-size: 14px;
  display: flex;
  align-items: center;
`;

const ArrowUp = styled(ArrowUpwardIcon)`
  font-size: 18px !important;
  color: green;
`;

const ArrowDown = styled(ArrowDownwardIcon)`
  font-size: 18px !important;
  color: red;
`;

const Desc = styled.span`
  color: gray;
`;

const FeaturedInfo = () => {
  const [income, setIncome] = useState([]);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get("/order/income");
        setIncome(res.data);
        setPercent(
          (
            (res.data[0].totalSales / res.data[1].totalSales) * 100 -
            100
          ).toFixed(2)
        );
      } catch (error) {
        console.log(error);
      }
    };
    getIncome();
  }, []);

  const numberWithCommas = (x) => {
    return x && x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <Container>
      <ItemWrapper>
        <Title>Sales</Title>
        <MoneyWrapper>
          <Money>{income[0] && numberWithCommas(income[0].totalSales)} đ</Money>
          <MoneyRate>
            {percent}%{percent > 0 ? <ArrowUp /> : <ArrowDown />}
          </MoneyRate>
        </MoneyWrapper>
        <Desc>Compared to last month</Desc>
      </ItemWrapper>
      <ItemWrapper>
        <Title>Cost</Title>
        <MoneyWrapper>
          <Money>75.650.000 đ</Money>
          <MoneyRate>
            -1.560.000 <ArrowDown />
          </MoneyRate>
        </MoneyWrapper>
        <Desc>Compared to last month</Desc>
      </ItemWrapper>
      <ItemWrapper>
        <Title>Revenue</Title>
        <MoneyWrapper>
          <Money>3.650.000 đ</Money>
          <MoneyRate>
            -1.280.000 <ArrowDown />
          </MoneyRate>
        </MoneyWrapper>
        <Desc>Compared to last month</Desc>
      </ItemWrapper>
    </Container>
  );
};

export default FeaturedInfo;
