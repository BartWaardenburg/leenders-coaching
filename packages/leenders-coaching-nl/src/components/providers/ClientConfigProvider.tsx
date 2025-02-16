'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { ConfigType } from './ConfigProvider';

const ConfigContext = createContext<ConfigType | null>(null);

type ClientConfigProviderProps = {
  children: ReactNode;
  config: ConfigType;
};

/**
 * Client component that provides configuration data through React Context
 */
export const ClientConfigProvider = ({ children, config }: ClientConfigProviderProps) => {
  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
};

/**
 * Hook to access configuration data
 */
export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
}; 