import React from 'react';
import { useImmer } from 'use-immer';
import * as slotHelper from '../helpers/slotHelper';
import defaultSlots from '../data/defaultSlots';

const SlotContext = React.createContext();

export const SlotProvider = ({ children }) => {
  const [store, updateStore] = useImmer({
    slots: defaultSlots
  });

  React.useEffect(() => {
    const getLocalSlots = async () => {
      const localSlots = await slotHelper.getSyncStorageSlots();

      if (localSlots) {
        updateStore((draft) => {
          draft.slots = localSlots;
        });
      } else {
        await slotHelper.initialSlots(defaultSlots);
      }
    };
    getLocalSlots();
  }, [updateStore]);

  const addSlotToStore = async (slotInfo) => {
    const newSlot = await slotHelper.addSlotToStorage(slotInfo);
    updateStore((draft) => {
      draft.slots[newSlot.id] = newSlot;
    });
    return newSlot;
  };

  const deleteSlotFromStore = async (slotInfo) => {
    await slotHelper.deleteSlotFromStorage(slotInfo);
    updateStore((draft) => {
      if (Object.keys(draft.slots).length !== 0) {
        delete draft.slots[slotInfo.id];
      }
    });
  };

  const resetSlots = async (resetData) => {
    if (resetData) {
      await slotHelper.initialSlots(resetData);
      updateStore((draft) => {
        draft.slots = resetData;
      });
    } else {
      await slotHelper.initialSlots(defaultSlots);
      updateStore((draft) => {
        draft.slots = defaultSlots;
      });
    }
  };

  return (
    <SlotContext.Provider
      value={{
        slots: Object.keys(store.slots).map((key) => store.slots[key]),
        addSlot: addSlotToStore,
        deleteSlot: deleteSlotFromStore,
        resetSlots
      }}
    >
      {children}
    </SlotContext.Provider>
  );
};

export const useSlotStore = () => {
  const context = React.useContext(SlotContext);
  if (context === undefined) {
    throw new Error('useSlotStore must be used within a SlotProvider');
  }
  return context;
};
