import { createContext } from 'react';

// Lets any product card add to the bag without passing the handler through every section component.
export const ShopActions = createContext({ addToBag: () => {} });
