import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Chart from "../components/Chart";
import FeaturedInfo from "../components/FeaturedInfo";
import WidgetLg from "../components/WidgetLg";
import WidgetSm from "../components/WidgetSm";
import { userRequest } from "../requestMethods";

const Container = styled.div`
  flex: 4;
  color: black;
`;

const ChartWrapper = styled.div`
  padding: 30px;
  margin: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px -1px rgba(0, 0, 0, 0.25);
`;

const WidgetWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px;
`;

const Home = () => {
  const [userStats, setUserStats] = useState([]);

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
        const res = await userRequest.get("/user/stats");
        res.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTH[item._id - 1], "Active Users": item.total },
          ])
        );
      } catch (error) {
        console.log(error);
      }
    };
    getStats();
  }, [MONTH]);

  return (
    <Container>
      <FeaturedInfo />
      <ChartWrapper>
        <Chart
          title="Users Analytics"
          data={userStats}
          dataKey="Active Users"
        />
      </ChartWrapper>
      <WidgetWrapper>
        <WidgetSm />
        <WidgetLg />
      </WidgetWrapper>
    </Container>
  );
};

export default Home;
