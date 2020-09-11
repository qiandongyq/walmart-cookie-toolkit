import React from 'react';
import { Box, Heading, Flex, Icon, Collapse } from '@chakra-ui/core';

export const CollapseSection = ({ title, children }) => {
  const [show, setShow] = React.useState(true);
  const handleToggle = () => setShow((prev) => !prev);
  return (
    <Box>
      <Flex alignItems="center">
        <Heading as="h2" size="md" mr={3}>
          {title}
        </Heading>
        <Box>
          {show ? (
            <Icon
              cursor="pointer"
              name="chevron-up"
              size={4}
              onClick={handleToggle}
              bg="teal.200"
              rounded="100%"
            >
              Toggle
            </Icon>
          ) : (
            <Icon
              cursor="pointer"
              name="chevron-down"
              size={4}
              onClick={handleToggle}
              bg="gray.400"
              rounded="100%"
            >
              Toggle
            </Icon>
          )}
        </Box>
      </Flex>

      <Collapse mt={5} isOpen={show} borderTopWidth="1px">
        {children}
      </Collapse>
    </Box>
  );
};
