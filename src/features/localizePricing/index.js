import React from 'react';
import { Grid, Box, Text, Heading } from '@chakra-ui/core';
import * as lpHelper from '../../helpers/lpHelper';

export const LocalizePricing = () => {
  const [localStoreCookie, setLocalStoreCookie] = React.useState({});

  React.useEffect(() => {
    const localStoreInfo = lpHelper.decodeLocalStoreInfoCookie();
    setLocalStoreCookie(localStoreInfo);
  }, []);

  return Object.keys(localStoreCookie).length === 0 ? (
    <Box py={5}>
      <Heading as="h3" size="sm">
        Cannot find localStoreInfo cookie
      </Heading>
    </Box>
  ) : (
    <Grid
      templateColumns="repeat(2, 1fr)"
      gap={4}
      borderStyle="dashed"
      borderWidth="1px"
      p={3}
    >
      {Object.keys(localStoreCookie).map((key) => (
        <React.Fragment key={key}>
          <Box w="100%">
            <Text fontSize="sm">{key}:</Text>
          </Box>
          <Box w="100%">
            <Text color="teal.200" fontSize="sm">
              {localStoreCookie[key]}
            </Text>
          </Box>
        </React.Fragment>
      ))}
    </Grid>
  );
};
