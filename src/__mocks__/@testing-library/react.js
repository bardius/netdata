import { StylesProvider } from '@material-ui/styles';
import React from 'react';

const react = jest.requireActual('@testing-library/react');

// Mock the MUI component makeStyles className generation method to remove the counter for snapshots
const generateClassName = (rule, styleSheet) => `${styleSheet.options.classNamePrefix}-${rule.key}`;

const render = args => {
  return react.render(
    <StylesProvider generateClassName={generateClassName}>
      {args}
    </StylesProvider>,
  )
}

module.exports = { ...react, render }
