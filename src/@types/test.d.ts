import { ReactNode } from 'react';
import { RenderOptions } from '@testing-library/react-native';

declare global {
  interface ProviderWrapper {
    children: ReactNode;
  }

  interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: Partial<RootState>;
    store?: AppStore;
  }
}