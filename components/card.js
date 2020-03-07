import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import 'gestalt/dist/gestalt.css';

const Container = styled.div`
  max-width: 450px;
  width: 100%;
  cursor: pointer;
`;

const Title = styled.p`
  margin: 0;
  padding: 0;
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

const Card = ({ data }) => {
  return (
    <Link
      href={{ pathname: '/recipe/[id]', query: data.id }}
      as={`/recipe/${data.id}`}
    >
      <Container>
        <Image src={data.imageUrl} />
        <Title>{data.title}</Title>
      </Container>
    </Link>
  );
};

export default Card;
