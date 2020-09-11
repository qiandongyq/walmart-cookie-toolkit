import React from 'react';
import { useImmer } from 'use-immer';
import * as customCookiesPoolHelper from '../helpers/customCookiesPoolHelper';

const CustomCookiesPoolContext = React.createContext();

export const CustomCookiesPoolProvider = ({ children }) => {
  const [store, updateStore] = useImmer({
    customCookies: {}
  });

  React.useEffect(() => {
    const getLocalCustomCookies = async () => {
      const localCustomCookies = await customCookiesPoolHelper.getSyncStorageCustomCookiesPool();
      if (localCustomCookies) {
        updateStore((draft) => {
          draft.customCookies = localCustomCookies;
        });
      }
    };
    getLocalCustomCookies();
  }, [updateStore]);

  const addCookie = async (cookie) => {
    await customCookiesPoolHelper.addCookieToStorage(cookie);
    updateStore((draft) => {
      draft.customCookies[cookie.name] = cookie;
    });
  };

  const deleteCookie = async (cookie) => {
    await customCookiesPoolHelper.deleteCookieFromStorage(cookie);
    updateStore((draft) => {
      delete draft.customCookies[cookie.name];
    });
  };

  const resetCustomCookies = async (resetData) => {
    if (resetData) {
      await customCookiesPoolHelper.initialCustomCookiesPool(resetData);
      updateStore((draft) => {
        draft.customCookies = resetData;
      });
    } else {
      await customCookiesPoolHelper.initialCustomCookiesPool({});
      updateStore((draft) => {
        draft.customCookies = {};
      });
    }
  };

  return (
    <CustomCookiesPoolContext.Provider
      value={{
        customCookies: store.customCookies,
        addCustomCookie: addCookie,
        deleteCustomCookie: deleteCookie,
        resetCustomCookies
      }}
    >
      {children}
    </CustomCookiesPoolContext.Provider>
  );
};

export const useCustomCookiesStore = () => {
  const context = React.useContext(CustomCookiesPoolContext);
  if (context === undefined) {
    throw new Error('useCustomCookiesStore must be used within a SlotProvider');
  }
  return context;
};
