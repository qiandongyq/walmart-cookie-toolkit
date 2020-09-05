import React from 'react';
import {
  Stack,
  Box,
  InputGroup,
  InputLeftAddon,
  Input,
  Icon,
  PseudoBox,
  Tooltip
} from '@chakra-ui/core';
import * as JsSearch from 'js-search';
import goldenData from '../data/goldenData';

// js-search
const search = new JsSearch.Search('SKU');
search.addIndex('SKU');
search.addIndex('OFFERID');
search.addIndex('ITEM_TYPE');
search.addIndex('PRICE');
search.addIndex('OFFERTYPE');
search.addDocuments(goldenData);

export const GDSSearch = ({ onSelect }) => {
  const [result, setResult] = React.useState([]);
  const [searchItem, setSearchItem] = React.useState({});
  const [searchInputValue, setSearchInputValue] = React.useState('');
  const [showSearch, setShowSearch] = React.useState(false);

  const addToSearchItem = (item) => {
    setSearchInputValue('');
    setSearchItem(item);
    setShowSearch(true);
    setResult([]);
    onSelect(item);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    if (value) {
      setShowSearch(true);
      const result = search.search(value);
      setResult(result);
    } else {
      setShowSearch(false);
      setResult([]);
      setSearchItem({});
    }
    setSearchInputValue(value);
  };

  return (
    <Stack mt={5} onClick={null}>
      <InputGroup>
        <InputLeftAddon>
          <Tooltip
            label="Indexed by SKUID, OFFER ID, PRICE, ITEM TYPE, OFFER TYPE"
            placement="top"
          >
            <Icon name="search-2" size="16px" />
          </Tooltip>
        </InputLeftAddon>
        <Input
          type="text"
          placeholder="61499392212"
          value={searchInputValue || searchItem.SKU || ''}
          onChange={handleSearch}
        />
      </InputGroup>
      {showSearch && (
        <Box
          zIndex={100}
          bg="gray.700"
          borderStyle="solid"
          borderWidth="1px"
          rounded="md"
          shadow="md"
          overflowY="scroll"
          maxH={200}
        >
          {result.map((item) => (
            <PseudoBox
              key={item.SKU}
              p={2}
              _hover={{ bg: 'gray.600', color: 'teal.200' }}
              cursor="pointer"
              onClick={() => addToSearchItem(item)}
            >
              {item.SKU} - {item.ITEM_TYPE} - {item.OFFERTYPE} - ${item.PRICE}
            </PseudoBox>
          ))}
        </Box>
      )}
    </Stack>
  );
};
