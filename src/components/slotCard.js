import React from 'react';
import { Box, Text, useColorMode, PseudoBox } from '@chakra-ui/core';
import { customColor } from '../theme';
import { ActionIcon } from './actionIcon';

export const SlotCard = ({ slot, deleteSlot }) => {
  const { colorMode } = useColorMode();
  const [showAction, setShowAction] = React.useState(false);

  return (
    <PseudoBox
      w={56}
      bg={customColor.card_bg[colorMode]}
      rounded="md"
      cursor="pointer"
      shadow="md"
      mt={3}
      mr={4}
      position="relative"
      onMouseEnter={() => setShowAction(true)}
      onMouseLeave={() => setShowAction(false)}
      transition="all 300ms"
      _hover={{
        boxShadow: '0 2px 8px rgba(54, 230, 180,0.5)'
      }}
    >
      <Box px={4} py={2} overflow="hidden">
        <Text isTruncated fontSize="sm">
          {slot.postalCode} - {slot.slotType}
        </Text>

        {showAction && (
          <ActionIcon
            action={() => deleteSlot(slot)}
            iconName="delete"
            hover={{ bg: 'red.500' }}
            tooltip="Delete"
            bg={customColor.action_icon_bg[colorMode]}
            position="absolute"
            top={-18}
            right={0}
            rounded="full"
            p={1}
          />
        )}
      </Box>
    </PseudoBox>
  );
};
