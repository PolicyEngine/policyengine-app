import { render } from '@testing-library/react';
import Jobs from '../../pages/Jobs';

test('renders Jobs page without crashing', () => {
  render(<Jobs />);
});