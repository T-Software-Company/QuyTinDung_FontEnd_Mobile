import React, {createContext, useState, useContext, ReactNode} from 'react';
import {lightTheme, darkTheme} from '../theme/colors';
import type {Theme} from '../theme/colors';

// Define the shape of our context value
interface ThemeContextType {
  theme: Theme; // Current theme object
  isDarkMode: boolean; // Current theme mode
  toggleTheme: () => void; // Function to switch themes
}

// Props for the ThemeProvider component
interface ThemeProviderProps {
  children: ReactNode; // Child components that will have access to the theme
}

// Create the context with undefined as initial value
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

// Theme Provider Component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
  // State to track dark mode preference
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // Select theme based on dark mode preference
  const theme = isDarkMode ? darkTheme : lightTheme;

  // Toggle between light and dark themes
  const toggleTheme = (): void => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{theme, isDarkMode, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for using theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeProvider;
