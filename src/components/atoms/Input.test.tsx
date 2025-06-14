import { render, screen, fireEvent } from '@testing-library/react';
import Input from './Input';

describe('Input', () => {
  it('renders input with placeholder', () => {
    render(<Input placeholder="Type here" />);
    expect(screen.getByPlaceholderText('Type here')).toBeInTheDocument();
  });

  it('calls onChange when typing', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'abc' } });
    expect(handleChange).toHaveBeenCalled();
  });
});
