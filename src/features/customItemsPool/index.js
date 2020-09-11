import React from 'react';
import { GDSSearch } from '../../components';
import { Box, Tag, TagLabel, TagCloseButton, useToast } from '@chakra-ui/core';
import { useCustomItemsStore } from '../../store';

export const CustomItemsPool = () => {
  const {
    customItems,
    addCustomItem,
    deleteCustomItem
  } = useCustomItemsStore();
  const toast = useToast();

  const handleSelectFromSearch = (item) => {
    addCustomItem(item);
    toast({
      title: `Success`,
      description: `${item.SKU} is added to your custom items pool`,
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top'
    });
  };
  const handleDeleteCustomItem = (item) => {
    deleteCustomItem(item);
    toast({
      title: `Success`,
      description: `${item.SKU} is removed from your custom items pool`,
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top'
    });
  };

  return (
    <Box>
      <GDSSearch onSelect={handleSelectFromSearch} />
      <Box>
        {Object.keys(customItems).map((key) => (
          <Tag key={key} variantColor="teal" mr={3} mt={3}>
            <TagLabel>{customItems[key].SKU}</TagLabel>
            <TagCloseButton
              onClick={() => handleDeleteCustomItem(customItems[key])}
            />
          </Tag>
        ))}
      </Box>
    </Box>
  );
};
