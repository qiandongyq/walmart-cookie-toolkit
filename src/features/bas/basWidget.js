import React from 'react';
import { Select, PseudoBox } from '@chakra-ui/core';
import { useSlotStore } from '../../store';

const Option = (props) => <PseudoBox as="option" bg="gray.700" {...props} />;

export const BasWidget = ({ value, onChange }) => {
  const { slots } = useSlotStore();
  return (
    <Select
      size="md"
      rootProps={{ maxW: '150px' }}
      onChange={onChange}
      value={value}
    >
      <Option value="no">Book a slot</Option>
      {slots.map((slot) => (
        <Option key={slot.id} value={slot.id}>
          {slot.postalCode} - {slot.slotType}
        </Option>
      ))}
    </Select>
  );
};
