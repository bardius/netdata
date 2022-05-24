import { createContext } from 'use-context-selector';
import { defaultProviderState } from './defaultState';
import type { CoinsProviderState } from './types';

const CoinsContext = createContext<CoinsProviderState>(defaultProviderState);

export { CoinsContext };
