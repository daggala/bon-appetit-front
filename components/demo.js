import React, { createRef, Fragment } from "react";
import { Box, Mask, Image, Link, Masonry, Spinner, Text } from "gestalt";
import { usePaginatedFetch } from "../actions/usePaginatedFetch";

const Demo = () => {
  const [{ data, isFetching }, fetchItems] = usePaginatedFetch();
  // Create the ref
  console.log("data.items ", data.items.length);
  const scrollContainerRef = createRef();

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
    <Fragment>
      <Box
        // width={800}
        // height={500}
        overflow="auto"
        shape="rounded"
        // Attach the ref
        ref={scrollContainerRef}
      >
        <Masonry
          comp={renderMasonryItem}
          loadItems={fetchItems}
          items={data.items}
          // Access the ref
          scrollContainer={() => scrollContainerRef.current}
          virtualize
        />
        <Spinner show={isFetching} accessibilityLabel="Test" />
      </Box>
     
    </Fragment>
  );
};

export default Demo;