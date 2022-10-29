import React, { useState, createContext, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material';

export const colorModeContext = createContext();
const ChangeMode = ({ children }) => {
  const [mode, setMode] = useState('light');
  const changeMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };
  const theme = useMemo(() => createTheme({
    palette: {
      mode,
    },
  }), [mode]);
  return (
    <colorModeContext.Provider value={{ mode, setMode, changeMode }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </colorModeContext.Provider>
  );
};

export default ChangeMode;
