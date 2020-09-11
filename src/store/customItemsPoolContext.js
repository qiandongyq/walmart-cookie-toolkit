import React from 'react';
import { useImmer } from 'use-immer';
import * as customItemsPoolHelper from '../helpers/customItemsPoolHelper';

const CustomItemsPoolContext = React.createContext();

export const CustomItemsPoolProvider = ({ children }) => {
  const [store, updateStore] = useImmer({
    customItems: {}
  });

  React.useEffect(() => {
    const getLocalCustomItems = async () => {
      const localCustomItems = await customItemsPoolHelper.getSyncStorageCustomItemsPool();
      if (localCustomItems) {
        updateStore((draft) => {
          draft.customItems = localCustomItems;
        });
      }
    };
    getLocalCustomItems();
  }, [updateStore]);

  const addItem = async (item) => {
    await customItemsPoolHelper.addItemToStorage(item);
    updateStore((draft) => {
      draft.customItems[item.SKU] = item;
    });
  };

  const deleteItems = async (item) => {
    await customItemsPoolHelper.deleteItemFromStorage(item);
    updateStore((draft) => {
      delete draft.customItems[item.SKU];
    });
  };

  const resetCustomItems = async (resetData) => {
    if (resetData) {
      await customItemsPoolHelper.initialCustomItemsPool(resetData);
      updateStore((draft) => {
        draft.customItems = resetData;
      });
    } else {
      await customItemsPoolHelper.initialCustomItemsPool({});
      updateStore((draft) => {
        draft.customItems = {};
      });
    }
  };

  return (
    <CustomItemsPoolContext.Provider
      value={{
        customItems: store.customItems,
        addCustomItem: addItem,
        deleteCustomItem: deleteItems,
        resetCustomItems
      }}
    >
      {children}
    </CustomItemsPoolContext.Provider>
  );
};

export const useCustomItemsStore = () => {
  const context = React.useContext(CustomItemsPoolContext);
  if (context === undefined) {
    throw new Error(
      'useCustomItemsStore must be used within a CustomItemsPoolProvider'
    );
  }
  return context;
};
