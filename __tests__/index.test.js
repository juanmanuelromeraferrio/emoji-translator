import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../src/pages/index';

describe('Home page', () => {
  test('renders input and button', () => {
    render(<Home />);
    const inputElement = screen.getByLabelText('Enter a word:');
    expect(inputElement).toBeInTheDocument();
    const buttonElement = screen.getByRole('button', { name: 'Find Emoji' });
    expect(buttonElement).toBeInTheDocument();
  });

  test('displays loading spinner while fetching', async () => {
    const mockFetchPromise = Promise.resolve({
      json: () => Promise.resolve({ emoji: '👍' }),
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    render(<Home />);
    const inputElement = screen.getByLabelText('Enter a word:');
    const buttonElement = screen.getByRole('button', { name: 'Find Emoji' });
    fireEvent.change(inputElement, { target: { value: 'happy' } });
    fireEvent.click(buttonElement);

    const loadingElement = await screen.findByText('🔄');
    expect(loadingElement).toBeInTheDocument();

    global.fetch.mockClear();
    delete global.fetch;
  });

  test('displays the emoji when a word is found', async () => {
    const mockFetchPromise = Promise.resolve({
      json: () => Promise.resolve({ emoji: '👍' }),
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    render(<Home />);
    const inputElement = screen.getByLabelText('Enter a word:');
    const buttonElement = screen.getByRole('button', { name: 'Find Emoji' });
    fireEvent.change(inputElement, { target: { value: 'happy' } });
    fireEvent.click(buttonElement);

    const emojiElement = await screen.findByText('👍');
    expect(emojiElement).toBeInTheDocument();

    global.fetch.mockClear();
    delete global.fetch;
  });

  test('displays an error message if an error occurs', async () => {
    const errorMessage = '💩 Something went wrong. Please try again later.';
    const mockFetchPromise = Promise.reject(new Error(errorMessage));
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    render(<Home />);
    const inputElement = screen.getByLabelText('Enter a word:');
    const buttonElement = screen.getByRole('button', { name: 'Find Emoji' });
    fireEvent.change(inputElement, { target: { value: 'happy' } });
    fireEvent.click(buttonElement);

    const errorElement = await screen.findByText(errorMessage);
    expect(errorElement).toBeInTheDocument();

    global.fetch.mockClear();
    delete global.fetch;
  });

  test('displays a message when no emoji is found', async () => {
    const mockFetchPromise = Promise.resolve({
      json: () => Promise.resolve({ error: 'No emoji found.' }),
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    render(<Home />);
    const inputElement = screen.getByLabelText('Enter a word:');
    const buttonElement = screen.getByRole('button', { name: 'Find Emoji' });
    fireEvent.change(inputElement, { target: { value: 'happy' } });
    fireEvent.click(buttonElement);

    const noEmojiElement = await screen.findByText('😢 No emoji found.');
    expect(noEmojiElement).toBeInTheDocument();

    global.fetch.mockClear();
    delete global.fetch;
  });
});
