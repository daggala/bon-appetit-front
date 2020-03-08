import React, { useState, createRef } from 'react';
import styled from 'styled-components';
import Card from './card.js';
import { Box, Mask, Image, Link, Masonry, Spinner, Text } from "gestalt";
import { usePaginatedFetch } from '../actions/usePaginatedFetch';

const Container = styled.div`
  overflow: scroll;
  height: 500px;
  margin-top: 30px;
`;

const Recipes = ({ recipes, loadMore }) => {
  const [{ data, isFetching }, fetchItems] = usePaginatedFetch();

  console.log('data ', data)
  const domValue = createRef();

  const renderMasonryItem = ({ data }) => {
    return(
    <Box>
      <Mask shape="rounded">
        <Image
          alt="Test"
          // color={data.color}
          naturalHeight={1656}
          naturalWidth={2500}
          src={data.imageUrl}
        />
      </Mask>
      <Text size="sm">{data.author}</Text>
    </Box>)
}


  return (
    <Container ref={domValue}>
      <Masonry
        comp={renderMasonryItem}
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
