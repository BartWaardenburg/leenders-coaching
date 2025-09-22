'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { ConfigType } from '../ConfigProvider/ConfigProvider';

const ConfigContext = createContext<ConfigType | null>(null);

type ClientConfigProviderProps = {
  children: ReactNode;
  config: ConfigType;
  testid?: string;
};

/**
 * Client component that provides configuration data through React Context.
 * @param props - The provider props containing children and configuration.
 * @returns The client configuration provider with context.
 */
export const ClientConfigProvider = ({
  children,
  config,
  testid,
}: ClientConfigProviderProps) => {
  return (
    <ConfigContext.Provider value={config}>
      <div
        data-testid={testid || 'client-config-provider'}
        data-config={JSON.stringify(config)}
      >
        {children}
      </div>
    </ConfigContext.Provider>
  );
};

/**
 * Hook to access configuration data.
 * @returns The configuration object from context.
 * @throws Error if used outside of ConfigProvider.
 */
export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};
