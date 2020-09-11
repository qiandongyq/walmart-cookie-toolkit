import React from 'react';

import { useForm } from 'react-hook-form';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  SlideIn,
  Text,
  Select,
  PseudoBox,
  Grid
} from '@chakra-ui/core';
import provinces from '../data/provinces';

export const SlotForm = ({ isOpen, onClose, addSlot }) => {
  const { handleSubmit, errors, register, formState, reset } = useForm();

  const onSubmit = (values) => {
    addSlot(values);
    reset();
  };

  const validateEmptyString = (value) => {
    let error;
    if (!value) {
      error = 'This filed is required';
    }
    return error || true;
  };

  return (
    <SlideIn in={isOpen}>
      {(styles) => (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          preserveScrollBarGap
          closeOnOverlayClick={false}
          isCentered
          size="xl"
        >
          <ModalOverlay opacity={styles.opacity} />
          <ModalContent {...styles}>
            <ModalHeader>Create your slot</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalBody pb={6}>
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                  <FormControl isInvalid={errors.slotType}>
                    <FormLabel htmlFor="slotType">
                      Fulfillment Type{' '}
                      <Text as="em" color="red.400">
                        *
                      </Text>
                    </FormLabel>
                    <Select
                      size="md"
                      name="slotType"
                      defaultValue="PICK UP"
                      ref={register}
                    >
                      <PseudoBox
                        as="option"
                        bg="gray.700"
                        value="INSTORE_PICKUP"
                      >
                        INSTORE_PICKUP
                      </PseudoBox>
                      <PseudoBox as="option" bg="gray.700" value="DELIVERY">
                        DELIVERY
                      </PseudoBox>
                    </Select>
                  </FormControl>

                  <FormControl isInvalid={errors.accessPointId}>
                    <FormLabel htmlFor="accessPointId">
                      Access Point ID{' '}
                      <Text as="em" color="red.400">
                        *
                      </Text>
                    </FormLabel>
                    <Input
                      name="accessPointId"
                      placeholder="Get from QA/STG map"
                      ref={register({ validate: validateEmptyString })}
                    />
                    <FormErrorMessage>
                      {errors.accessPointId && errors.accessPointId.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={errors.addressLine1}>
                    <FormLabel htmlFor="addressLine1">
                      Address Line 1{' '}
                      <Text as="em" color="red.400">
                        *
                      </Text>
                    </FormLabel>
                    <Input
                      name="addressLine1"
                      placeholder=""
                      ref={register({ validate: validateEmptyString })}
                    />
                    <FormErrorMessage>
                      {errors.addressLine1 && errors.addressLine1.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={errors.city}>
                    <FormLabel htmlFor="city">
                      City{' '}
                      <Text as="em" color="red.400">
                        *
                      </Text>
                    </FormLabel>
                    <Input
                      name="city"
                      placeholder=""
                      ref={register({ validate: validateEmptyString })}
                    />
                    <FormErrorMessage>
                      {errors.city && errors.city.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="province">
                      Province{' '}
                      <Text as="em" color="red.400">
                        *
                      </Text>
                    </FormLabel>
                    <Select
                      size="md"
                      name="province"
                      defaultValue="Ontario"
                      ref={register}
                    >
                      {provinces.map((province) => (
                        <PseudoBox
                          key={province.value}
                          as="option"
                          bg="gray.700"
                          value={province.value}
                        >
                          {province.name}
                        </PseudoBox>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl isInvalid={errors.postalCode}>
                    <FormLabel htmlFor="postalCode">
                      Postal Code{' '}
                      <Text as="em" color="red.400">
                        *
                      </Text>
                    </FormLabel>
                    <Input
                      name="postalCode"
                      placeholder=""
                      ref={register({ validate: validateEmptyString })}
                    />
                    <FormErrorMessage>
                      {errors.postalCode && errors.postalCode.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={errors.latitude}>
                    <FormLabel htmlFor="latitude">
                      Latitude{' '}
                      <Text as="em" color="red.400">
                        *
                      </Text>
                    </FormLabel>
                    <Input
                      name="latitude"
                      placeholder=""
                      ref={register({ validate: validateEmptyString })}
                    />
                    <FormErrorMessage>
                      {errors.latitude && errors.latitude.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={errors.longitude}>
                    <FormLabel htmlFor="longitude">
                      Longitude{' '}
                      <Text as="em" color="red.400">
                        *
                      </Text>
                    </FormLabel>
                    <Input
                      name="longitude"
                      placeholder=""
                      ref={register({ validate: validateEmptyString })}
                    />
                    <FormErrorMessage>
                      {errors.longitude && errors.longitude.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={errors.addressLine2}>
                    <FormLabel htmlFor="addressLine2">Address Line 2</FormLabel>
                    <Input name="addressLine2" placeholder="" ref={register} />
                  </FormControl>
                  <FormControl isInvalid={errors.firstName}>
                    <FormLabel htmlFor="firstName">First Name</FormLabel>
                    <Input
                      name="firstName"
                      placeholder="wdt first name"
                      ref={register}
                    />
                  </FormControl>
                  <FormControl isInvalid={errors.lastName}>
                    <FormLabel htmlFor="lastName">Last Name</FormLabel>
                    <Input
                      name="lastName"
                      placeholder="wdt last name"
                      ref={register}
                    />
                  </FormControl>
                  <FormControl isInvalid={errors.phone}>
                    <FormLabel htmlFor="phone">Mobile phone number</FormLabel>
                    <Input
                      name="phone"
                      placeholder="4068888888"
                      ref={register}
                    />
                  </FormControl>
                  <FormControl isInvalid={errors.deliveryInstructions}>
                    <FormLabel htmlFor="phone">Delivery Instructions</FormLabel>
                    <Input
                      name="deliveryInstructions"
                      placeholder=""
                      ref={register}
                    />
                  </FormControl>
                </Grid>
              </ModalBody>
              <ModalFooter>
                <Button
                  variantColor="teal"
                  mr={3}
                  type="submit"
                  isLoading={formState.isSubmitting}
                >
                  Submit
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      )}
    </SlideIn>
  );
};
