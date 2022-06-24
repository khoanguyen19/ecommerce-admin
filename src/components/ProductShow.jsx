import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Chart from "./Chart";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { userRequest } from "../requestMethods";

const Container = styled.div`
  display: flex;
`;

const Wrapper = styled.div`
  flex: 1;
  padding: 20px;
  margin-top: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px -1px rgba(0, 0, 0, 0.25);

  &:first-child {
    margin-right: 20px;
  }
`;

const ImgWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Img = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
`;

const Name = styled.span`
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const InfoWrapper = styled.div`
  margin-left: 50px;
`;

const InfoItem = styled.div`
  display: flex;
`;

const Key = styled.span`
  width: 90px;
`;

const Value = styled.span`
  color: #777;
`;

const ProductShow = () => {
  const [productStats, setProductStats] = useState([]);
  const location = useLocation();
  const productId = location.pathname.split("/")[2];

  const MONTH = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get(`order/income?pid=${productId}`);
        res.data.map((item) =>
          setProductStats((prev) => [
            ...prev,
            { name: MONTH[item._id - 1], "Total Sales": item.totalSales },
          ])
        );
      } catch (error) {
        console.log(error);
      }
    };
    getStats();
  }, [productId, MONTH]);

  const product = useSelector((state) =>
    state.product.products.find((p) => p._id === productId)
  );

  return (
    <Container>
      <Wrapper>
        <Chart
          title="Sales Performance (last 3 months)"
          data={productStats}
          dataKey="Sales"
        />
      </Wrapper>
      <Wrapper>
        <ImgWrapper>
          <Img src={product.img} />
          <Name>{product.title}</Name>
        </ImgWrapper>
        <InfoWrapper>
          <InfoItem>
            <Key>id:</Key>
            <Value>{product._id}</Value>
          </InfoItem>
          <InfoItem>
            <Key>sales:</Key>
            <Value>{product.sales}</Value>
          </InfoItem>
          <InfoItem>
            <Key>in stock:</Key>
            <Value>{product.inStock.toString()}</Value>
          </InfoItem>
        </InfoWrapper>
      </Wrapper>
    </Container>
  );
};

export default ProductShow;
