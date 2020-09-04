import React from 'react';
import { Box, Heading, Flex, Icon, Collapse } from '@chakra-ui/core';

export const CollapseSection = ({ title, children }) => {
  const [show, setShow] = React.useState(true);
  const handleToggle = () => setShow((prev) => !prev);
  return (
    <Box>
      <Flex alignItems="center">
        <Heading as="h2" size="md">
          {title}
        </Heading>
        <Box>
          {show ? (
            <Icon
              cursor="pointer"
              name="chevron-up"
              size={8}
              onClick={handleToggle}
            >
              Toggle
            </Icon>
          ) : (
            <Icon
              cursor="pointer"
              name="chevron-down"
              size={8}
              onClick={handleToggle}
            >
              Toggle
            </Icon>
          )}
        </Box>
      </Flex>

      <Collapse mt={4} isOpen={show}>
        {children}
      </Collapse>
    </Box>
  );
};
