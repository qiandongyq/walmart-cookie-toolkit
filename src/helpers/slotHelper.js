import axios from 'axios';
import { QA_BASE_URL, SLOT_TYPE, WDT_BAS_PROFILE } from './constants';
import { nanoid } from 'nanoid';
import * as storage from '../utils/storage';
import { dateShortForm } from '../utils/date';
import { getUrlFromEnv } from '../utils/url';

// Slot UI
export const initialSlots = async (defaultSlots) => {
  await storage.setSyncStorage(WDT_BAS_PROFILE, defaultSlots);
};

export const getSyncStorageSlots = async () => {
  const data = await storage.getSyncStorage(WDT_BAS_PROFILE);
  return data ? data[WDT_BAS_PROFILE] : {};
};

export const addSlotToStorage = async (slotInfo) => {
  const existSlots = await getSyncStorageSlots();
  const hasSlots =
    existSlots !== undefined && Object.keys(existSlots).length > 0;
  const newSlots = {
    id: nanoid(),
    ...slotInfo
  };
  let updatedSlots = hasSlots
    ? { ...existSlots, [newSlots.id]: newSlots }
    : { [newSlots.id]: newSlots };

  await storage.setSyncStorage(WDT_BAS_PROFILE, updatedSlots);
  return newSlots;
};

export const deleteSlotFromStorage = async (slot) => {
  const existSlots = await getSyncStorageSlots();
  const hasSlots =
    existSlots !== undefined && Object.keys(existSlots).length > 0;
  if (hasSlots) {
    delete existSlots[slot.id];
    await storage.setSyncStorage(WDT_BAS_PROFILE, existSlots);
  }
};

// Slot API
const getSlots = async (apiUrl, payload) => {
  const slots = await axios.post(
    `${apiUrl}/accesspoints/slotavailability?grocery=true`,
    payload
  );
  return slots.data;
};

const reserveSlot = async (apiUrl, payload) => {
  return await axios.post(`${apiUrl}/slot/reserve`, payload);
};

const getSlotDetail = (slots) => {
  const { accessPointId, fulfillmentType, fulfillStoreId } = slots.slotDays[0];
  let availableSlot = {};
  slots.slotDays.some((day) =>
    day.slots.some((slot) => {
      if (slot.status === 'AVAILABLE') {
        const { slotId, priority } = slot;
        availableSlot = {
          accessPointId,
          fulfillmentType,
          fulfillStoreId,
          slotId,
          priority
        };
        return true;
      }
      return false;
    })
  );
  return availableSlot;
};

export const addSlot = async (slotInfo, env = QA_BASE_URL) => {
  const baseApiUrl = getUrlFromEnv(env);
  const apiUrl = `${baseApiUrl}/api/cart-page`;
  let slots = {};
  let reserveSlotPayload = {};
  let startDate = new Date();
  let endDate = new Date();
  startDate = dateShortForm(startDate);
  endDate = new Date(endDate.setDate(endDate.getDate() + 3));
  endDate = dateShortForm(endDate);
  const baseGetSlotsPayload = {
    startDate,
    endDate,
    accessPointId: slotInfo.accessPointId,
    serviceInfo: { fulfillmentType: slotInfo.slotType }
  };
  if (slotInfo.slotType === SLOT_TYPE.INSTORE_PICKUP) {
    slots = await getSlots(apiUrl, baseGetSlotsPayload);
  } else {
    const deliveryGetSlotsPayload = {
      ...baseGetSlotsPayload,
      customerInfo: {
        customerAddress: {
          addressLineOne: slotInfo.address.addressLine1,
          city: slotInfo.address.city,
          country: slotInfo.address.country,
          latitude: slotInfo.address.latitude,
          longitude: slotInfo.address.longitude,
          postalCode: slotInfo.address.postalCode,
          stateOrProvinceName: slotInfo.address.state
        }
      }
    };
    slots = await getSlots(apiUrl, deliveryGetSlotsPayload);
  }

  if (Object.keys(slots).length > 0) {
    const {
      accessPointId,
      fulfillmentType,
      fulfillStoreId,
      slotId,
      priority
    } = getSlotDetail(slots);
    if (slotId) {
      reserveSlotPayload = {
        slotId: slotId,
        accessPointId: accessPointId,
        fulfillmentType: fulfillmentType,
        address: slotInfo.address,
        bagPreference: true,
        storeId: fulfillStoreId.toString(),
        slotPriority: priority.toString()
      };
    } else {
      throw new Error('No slot found!');
    }
  } else {
    throw new Error('No slot found!');
  }
  if (Object.keys(reserveSlotPayload).length > 0) {
    const reservedSlot = await reserveSlot(apiUrl, reserveSlotPayload);
    return reservedSlot.data;
  } else {
    throw new Error('No slot found!');
  }
};
