import React from 'react';

import { render } from '@testing-library/react';

import '@testing-library/jest-dom';

import ColorRefreshButton from './ColorRefreshButton';

describe('<ColorRefreshButton />', () => {
  it('renders color refresh button', () => {
    const backgroundColor = '#ffffff';
    const { getByRole } = render(
      <ColorRefreshButton
        backgroundColor={backgroundColor}
      />,
    );
    const colorChangeButton = getByRole('button', { label: 'colorChange' });

    expect(colorChangeButton).toBeDefined();
  });
});
