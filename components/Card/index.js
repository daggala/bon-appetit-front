import React from "react";
import styled from "styled-components";
import Link from "next/link";
import "gestalt/dist/gestalt.css";

const Card = ({ data }) => {
  return (
    <Link href={{ pathname: "/recipe/[id]" }} as={`/recipe/${data.id}`}>
      <Container>
        <Image naturalHeight={1656} naturalWidth={2500} src={data.imageUrl} />
        <Title>{data.title}</Title>
      </Container>
    </Link>
  );
};

export default Card;

const Container = styled.div`
  width: 100%;
  cursor: pointer;
  @media (min-width: 516px) {
    max-width: 450px;
  }
`;

const Title = styled.p`
  margin-bottom: 10px;
  margin-top: 4px;
  padding: 0;
  @media (min-width: 516px) {
    margin: 0;
  }
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 10px;
  height: 300px;
`;
