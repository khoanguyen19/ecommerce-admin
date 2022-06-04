import React from "react";
import styled from "styled-components";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const Container = styled.div``;

const Title = styled.h3`
  margin-bottom: 32px;
  font-size: 22px;
`;

const Chart = ({ title, data, dataKey }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <Tooltip />
          <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
};

export default Chart;
