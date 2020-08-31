import React from 'react';
import { Icon, PseudoBox, Tooltip } from '@chakra-ui/core';

export const ActionIcon = ({
  action,
  iconName,
  iconColor,
  hover,
  tooltip,
  size = '16px',
  ...props
}) => {
  return (
    <PseudoBox
      as="button"
      p={1}
      m="0px"
      rounded="full"
      onClick={action}
      _hover={hover ? hover : { bg: 'teal.200' }}
      display="flex"
      transition="all 300ms"
      shadow="md"
      outline="none"
      {...props}
    >
      {tooltip ? (
        <Tooltip label={tooltip} hasArrow placement="top">
          <Icon name={iconName} color={iconColor} size={size} />
        </Tooltip>
      ) : (
        <Icon name={iconName} color={iconColor} size={size} />
      )}
    </PseudoBox>
  );
};
