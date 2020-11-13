import React from 'react';

import { render } from '@testing-library/react';

import '@testing-library/jest-dom';

import LabelPreview from './LabelPreview';

describe('<LabelPreview />', () => {
  it('renders label preview', () => {
    const name = 'Test Label';
    const color = '#ffffff';

    const { container } = render(
      <LabelPreview
        name={name}
        color={color}
      />,
    );

    expect(container).toHaveTextContent('Test Label');
  });
});
