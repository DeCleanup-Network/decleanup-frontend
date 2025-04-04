"use client"; // Add this at the top for Next.js

import { createContext, useContext, useState, ReactNode } from 'react';

// Define Context Type
interface CleanupContextType {
  cleanupPicture: {
    before: File | null;
    after: File | null;
  };
  setCleanupPicture: React.Dispatch<
    React.SetStateAction<{
      before: File | null;
      after: File | null;
    }>
  >;
  checkBox: boolean;
  setCheckBox: React.Dispatch<React.SetStateAction<boolean>>;
}

const ContextApi = createContext<CleanupContextType | undefined>(undefined);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [cleanupPicture, setCleanupPicture] = useState<{
    before:  File | null;
    after:   File | null;
  }>({
    before: null,
    after: null,
  });
  
  const [checkBox, setCheckBox] = useState(false);

  const value = { cleanupPicture, setCleanupPicture, checkBox, setCheckBox };
  
  return <ContextApi.Provider value={value}>{children}</ContextApi.Provider>;
};

export const useCleanupContext = () => {
  const context = useContext(ContextApi);
  if (!context) {
    throw new Error('useCleanupContext must be used within a ContextProvider');
  }
  return context;
};
