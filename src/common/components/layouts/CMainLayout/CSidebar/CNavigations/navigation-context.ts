import { createContext } from 'react';

const defaultValues = {
  current: '',
  setCurrent: (newValue: string) => {},
};

export const NavigationContext = createContext(defaultValues);
