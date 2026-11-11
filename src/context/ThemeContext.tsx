import React, {createContext, useContext, useEffect} from 'react';

type Theme = 'light';

interface ThemeContextType {
  theme: 'light';
  toggleTheme: () => void;
  setTheme: (t: 'light') => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
  setTheme: () => {},
});

export function ThemeProvider({children}: {children: React.ReactNode}) {
  const theme: 'light' = 'light';

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark');
    root.classList.add('light');
    try {
      window.localStorage.setItem('gabby-teq-theme-mode', 'light');
    } catch {
      // Storage quota fallback
    }
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme: () => {},
        setTheme: () => {},
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
