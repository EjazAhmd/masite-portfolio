import React, { createContext, useState, useContext, ReactNode } from 'react';

type ColorContextType = {
  accentColor: string;
  backgroundColor: string;
  primaryFontColor: string;
  secondaryFontColor: string;
  primaryFontFamily: string;
  secondaryFontFamily: string;
  setAccentColor: (color: string) => void;
  setBackgroundColor: (color: string) => void;
  setPrimaryFontColor: (color: string) => void;
  setSecondaryFontColor: (color: string) => void;
  setPrimaryFontFamily: (font: string) => void;
  setSecondaryFontFamily: (font: string) => void;
};

const defaultColors: ColorContextType = {
  accentColor: '#554cd6',
  backgroundColor: '#e7e5ff',
  primaryFontColor: '#08067f',
  secondaryFontColor: '#837ed3',
  primaryFontFamily: 'Roboto',
  secondaryFontFamily: 'Arial',
  setAccentColor: () => {},
  setBackgroundColor: () => {},
  setPrimaryFontColor: () => {},
  setSecondaryFontColor: () => {},
  setPrimaryFontFamily: () => {},
  setSecondaryFontFamily: () => {},
};

const ColorContext = createContext<ColorContextType>(defaultColors);

export const useColors = () => useContext(ColorContext);

export const ColorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [accentColor, setAccentColor] = useState(defaultColors.accentColor);
  const [backgroundColor, setBackgroundColor] = useState(defaultColors.backgroundColor);
  const [primaryFontColor, setPrimaryFontColor] = useState(defaultColors.primaryFontColor);
  const [secondaryFontColor, setSecondaryFontColor] = useState(defaultColors.secondaryFontColor);
  const [primaryFontFamily, setPrimaryFontFamily] = useState(defaultColors.primaryFontFamily);
  const [secondaryFontFamily, setSecondaryFontFamily] = useState(defaultColors.secondaryFontFamily);

  return (
    
    <ColorContext.Provider
      value={{
        accentColor,
        backgroundColor,
        primaryFontColor,
        secondaryFontColor,
        primaryFontFamily,
        secondaryFontFamily,
        setAccentColor,
        setBackgroundColor,
        setPrimaryFontColor,
        setSecondaryFontColor,
        setPrimaryFontFamily,
        setSecondaryFontFamily,
      }}
    >
      {children}
    </ColorContext.Provider>
  );
};

