import React from 'react';
import {
  Box,
  Text,
  Flex,
  PseudoBox,
  useDisclosure,
  useToast
} from '@chakra-ui/core';
import { SlotCard, SlotForm } from '../../components';
import { useSlotStore } from '../../store';

export const BasProfile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { slots, deleteSlot, addSlot } = useSlotStore();
  const toast = useToast();

  const handleDeleteSlot = async (slot) => {
    await deleteSlot(slot);
    toast({
      title: `Success`,
      description: `${slot.postalCode} is removed`,
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top'
    });
  };

  const handleAddSlot = async (values) => {
    try {
      const slotInfo = {
        postalCode: values.postalCode,
        accessPointId: values.accessPointId,
        slotType: values.slotType,
        address: {
          firstName: values.firstName || 'wdt first name',
          lastName: values.firstName || 'wdt last name',
          phone: values.pphone || '4068888888',
          addressLine1: values.addressLine1,
          addressLine2: values.addressLine2 || '',
          state: values.province,
          city: values.city,
          postalCode: values.postalCode,
          latitude: values.latitude,
          longitude: values.longitude,
          country: 'CA',
          deliveryInstructions: values.deliveryInstructions || ''
        }
      };

      await addSlot(slotInfo);
      onClose();
    } catch (err) {}
  };

  return (
    <>
      <Flex flexWrap="wrap">
        {slots.map((slot, index) => (
          <SlotCard key={index} slot={slot} deleteSlot={handleDeleteSlot} />
        ))}
        <PseudoBox
          w={56}
          key="new"
          borderWidth="1px"
          borderStyle="dashed"
          rounded="md"
          cursor="pointer"
          mt={3}
          mr={4}
          position="relative"
          _hover={{
            bg: 'gray.600'
          }}
        >
          <Box px={4} py={2} overflow="hidden" onClick={onOpen}>
            <Text isTruncated fontSize="sm">
              + New slot
            </Text>
          </Box>
        </PseudoBox>
      </Flex>
      <SlotForm isOpen={isOpen} onClose={onClose} addSlot={handleAddSlot} />
    </>
  );
};
