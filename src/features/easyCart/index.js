import React from 'react';
import {
  Stack,
  Box,
  Button,
  Radio,
  RadioGroup,
  Heading,
  useToast,
  Flex
} from '@chakra-ui/core';
import * as cartHelper from '../../helpers/cartHelper';
import * as slotHelper from '../../helpers/slotHelper';
import { EasyCartNumerInput, GDSSearch } from '../../components';
import {
  useProfileStore,
  useSlotStore,
  useCommonSettingsStore,
  useCustomItemsStore,
  useCustomCookiesStore
} from '../../store';
import { BasWidget } from '../../features';
import { formatSlotTime } from '../../utils/date';
import { COMMON_SETTINGS_TYPE, CHROME_STORE_ID } from '../../helpers/constants';
import * as tabHelper from '../../helpers/tabHelper';
import * as cookieHelper from '../../helpers/cookieHelper';
import { getEnvFromUrl } from '../../utils/url';

import { useImmer } from 'use-immer';

const defaultFields = {
  gmCount: 0,
  gmPrice: 0,
  gmLsCount: 0,
  gmOsCount: 0,
  gmDigitalCount: 0,
  gm3pCount: 0,
  goCount: 0,
  goPrice: 0,
  slot: 'no'
};

export const EasyCart = () => {
  const [formValues, updateFormValues] = useImmer(defaultFields);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { defaultProfile } = useProfileStore();
  const { commonSettings } = useCommonSettingsStore();
  const { customCookies } = useCustomCookiesStore();
  const { customItems } = useCustomItemsStore();
  const { slots } = useSlotStore();
  const [env, setEnv] = React.useState('QA');
  const [searchedItem, setSearchedItem] = React.useState({});
  const toast = useToast();

  React.useEffect(() => {
    if (defaultProfile.url) {
      const env = getEnvFromUrl(defaultProfile.url);
      setEnv(env);
    }
  }, [defaultProfile]);

  const handleEnvChange = (e) => setEnv(e.target.value);
  const handleOnSearchSelect = (item) => setSearchedItem(item);
  const handleFormChange = (value, fieldName) => {
    updateFormValues((draft) => {
      draft[fieldName] = value;
    });
  };

  const resetForm = () => updateFormValues((draft) => (draft = defaultFields));

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const items = cartHelper.getItems(formValues, searchedItem, customItems);
    if (items.length !== 0) {
      try {
        await cartHelper.addItemsToCart(items, env);
        toast({
          title: `Success`,
          description: `${items.length} added`,
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top'
        });
        setSearchedItem({});
      } catch (e) {
        toast({
          title: `An error occurred.`,
          description: `Unable to add items`,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top'
        });
      }
    }
    if (formValues.slot !== 'no') {
      try {
        const slotInfo = slots.find((slot) => slot.id === formValues.slot);
        const reservedSlot = await slotHelper.addSlot(slotInfo, env);
        toast({
          title: `Success`,
          description: `Slot booked ${formatSlotTime(reservedSlot.slotInfo)}`,
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top'
        });
        setSearchedItem({});
      } catch (e) {
        toast({
          title: `An error occurred.`,
          description: `Unable to add slot`,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top'
        });
      }
    }

    if (commonSettings[COMMON_SETTINGS_TYPE.AUTO_IMPORT].isEnabled) {
      const allCookies = await cookieHelper.importAllCookies(
        defaultProfile.url,
        CHROME_STORE_ID.NORMAL_MODE_STORE,
        customCookies
      );

      toast({
        title: `Success`,
        description: `${allCookies.length} cookies imported.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top'
      });
    }

    if (commonSettings[COMMON_SETTINGS_TYPE.AUTO_REFRESH].isEnabled) {
      await tabHelper.reloadActivePage();
    }

    if (commonSettings[COMMON_SETTINGS_TYPE.RTC_ON_ADD].isEnabled) {
      await tabHelper.redirectToCheckout(env);
    }

    resetForm();
    setIsSubmitting(false);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <Flex justify="space-between" align="center">
          <Stack
            isInline
            my={3}
            spacing={4}
            borderStyle="dashed"
            borderWidth="1px"
            p={3}
          >
            <RadioGroup
              isInline
              spacing={5}
              defaultValue={env}
              onChange={handleEnvChange}
              value={env}
            >
              <Radio value="QA" variantColor="teal" size="md">
                QA
              </Radio>
              <Radio value="STG" variantColor="teal" size="md">
                STG
              </Radio>
            </RadioGroup>
          </Stack>
          <BasWidget
            value={formValues.slot}
            onChange={(e) => handleFormChange(e.target.value, 'slot')}
          />
        </Flex>
        <GDSSearch onSelect={handleOnSearchSelect} />
        <Box spacing={4} mt={5}>
          <Heading as="h3" size="sm" color="teal.200">
            GM
          </Heading>
          <Box>
            <Stack
              isInline
              mt={3}
              spacing={4}
              borderStyle="dashed"
              borderWidth="1px"
              p={3}
            >
              <EasyCartNumerInput
                tl="GM Items Count"
                fn="Ct"
                value={formValues.gmCount}
                onChange={(value) => handleFormChange(value, 'gmCount')}
              />
              <EasyCartNumerInput
                tl="Minimium Price (Apply to all GM filters)"
                fn="$ >="
                fc="teal.200"
                value={formValues.gmPrice}
                onChange={(value) => handleFormChange(value, 'gmPrice')}
              />
            </Stack>
            <Box mt={3} borderStyle="dashed" borderWidth="1px" p={3}>
              <Stack isInline spacing={4}>
                <EasyCartNumerInput
                  tl="Limites Stock"
                  fn="LS"
                  value={formValues.gmLsCount}
                  onChange={(value) => handleFormChange(value, 'gmLsCount')}
                />
                <EasyCartNumerInput
                  tl="Out of Stock"
                  fn="OS"
                  value={formValues.gmOsCount}
                  onChange={(value) => handleFormChange(value, 'gmOsCount')}
                />
              </Stack>
              <Stack isInline mt={3} spacing={4}>
                <EasyCartNumerInput
                  tl="3P Items"
                  fn="3P"
                  value={formValues.gm3pCount}
                  onChange={(value) => handleFormChange(value, 'gm3pCount')}
                />
                <EasyCartNumerInput
                  tl="Digital Items"
                  fn="DT"
                  n="gmDigitalCount"
                  value={formValues.gmDigitalCount}
                  onChange={(value) =>
                    handleFormChange(value, 'gmDigitalCount')
                  }
                />
              </Stack>
            </Box>
          </Box>
        </Box>
        <Box spacing={4} mt={5}>
          <Heading as="h3" size="sm" color="teal.200">
            GO
          </Heading>
          <Stack
            isInline
            mt={3}
            spacing={4}
            borderStyle="dashed"
            borderWidth="1px"
            p={3}
          >
            <EasyCartNumerInput
              tl="Grocery Items Count"
              fn="Ct"
              value={formValues.goCount}
              onChange={(value) => handleFormChange(value, 'goCount')}
            />
            <EasyCartNumerInput
              tl="Minimum Price (Apply to all GO filters)"
              fn="$ >="
              color="teal.200"
              value={formValues.goPrice}
              onChange={(value) => handleFormChange(value, 'goPrice')}
            />
          </Stack>
        </Box>

        <Button
          size="lg"
          isLoading={isSubmitting}
          mt={5}
          variantColor="teal"
          type="submit"
          variant="outline"
          w="100%"
        >
          Add
        </Button>
      </form>
    </>
  );
};
