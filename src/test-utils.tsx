import * as React from 'react';
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import BASE_THEME from './theme/base';

const AllProviders = ({ children }: { children?: React.ReactNode }) => (
  <MuiThemeProvider theme={BASE_THEME}>
    <CssBaseline />
    {children}
  </MuiThemeProvider>
);

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options });

export { customRender as render };
