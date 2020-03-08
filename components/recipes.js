import React, { useState, createRef } from 'react';
import styled from 'styled-components';
import Card from './card.js';
import { Box, Mask, Image, Masonry, Spinner, Text } from "gestalt";
import { usePaginatedFetch } from '../actions/usePaginatedFetch';
import Link from 'next/link';

const Container = styled.div`
  overflow: scroll;
  height: 100vh;
  margin-top: 30px;
`;

const Recipes = ({ recipes, loadMore }) => {
  const [{ data, isFetching }, fetchItems] = usePaginatedFetch();

  const domValue = createRef();

  const renderMasonryItem = ({ data }) => {
    return(
   
    <Box style={{cursor: 'pointer'}}>
      <Mask shape="rounded">
        <Image
          alt="Test"
          naturalHeight={1656}
          naturalWidth={2500}
          src={data.imageUrl}
        />
      </Mask>
      <Link
      href={{ pathname: '/recipe/[id]', query: data.id }}
      as={`/recipe/${data.id}`}
    >
      <p size="sm">{data.title}</p>
      </Link>
    </Box>
  
    )
}


  return (
    <Container ref={domValue}>
      <Masonry
        comp={Card}
        items={data.items}
        scrollContainer={() => domValue.current}
        loadItems={fetchItems}
        minCols={1}
        virtualize
      />
    </Container>
  );
};

export default Recipes;
