import { createContext } from 'react';

// Create and export the color mode context
const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: 'light'
});

export default ColorModeContext;