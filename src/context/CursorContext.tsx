import React, {createContext, useContext, useState, useCallback} from 'react';

export type CursorType = 'default' | 'hover' | 'project' | 'contact' | 'drag';

interface CursorContextType {
  cursorType: CursorType;
  cursorText: string;
  setCursor: (type: CursorType, text?: string) => void;
  resetCursor: () => void;
}

const CursorContext = createContext<CursorContextType>({
  cursorType: 'default',
  cursorText: '',
  setCursor: () => {},
  resetCursor: () => {},
});

export function CursorProvider({children}: {children: React.ReactNode}) {
  const [cursorType, setCursorType] = useState<CursorType>('default');
  const [cursorText, setCursorText] = useState<string>('');

  const setCursor = useCallback((type: CursorType, text = '') => {
    setCursorType(type);
    setCursorText(text);
  }, []);

  const resetCursor = useCallback(() => {
    setCursorType('default');
    setCursorText('');
  }, []);

  return (
    <CursorContext.Provider value={{cursorType, cursorText, setCursor, resetCursor}}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  return useContext(CursorContext);
}
