import React from 'react';

import { render } from '@testing-library/react';

import '@testing-library/jest-dom';

import ColorChangeInput from './ColorChangeInput';

describe('<ColorChangeInput />', () => {
  it('renders color refresh button', () => {
    const colorValue = '#ffffff';
    const { getByDisplayValue } = render(
      <ColorChangeInput
        value={colorValue}
        onChange={() => {}}
      />,
    );
    const colorChangeInput = getByDisplayValue('#ffffff');

    expect(colorChangeInput).toBeDefined();
  });
});
