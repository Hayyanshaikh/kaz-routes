"use client";
import React from "react";
import CommonButton from "../components/common/CommonButton";
import Container from "../components/container/Container";
import useIncrement from "../hooks/customhook";

type Props = {};

const Home = (props: Props) => {
  const { value, increment, reset } = useIncrement(0, 1);
  return (
    <Container>
      <h1 className="text-2xl font-bold">Welcome to the Home Page</h1>
      <CommonButton label="Click me" onClick={increment} />
      <p>Current Value: {value}</p>
      <CommonButton label="Reset" onClick={reset} />
    </Container>
  );
};

export default Home;
