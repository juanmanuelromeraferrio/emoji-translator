import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../src/components/Footer';

describe('Footer', () => {
    test('renders the footer with correct content', () => {
        render(<Footer />);

        expect(screen.getByRole('contentinfo')).toBeInTheDocument();
        expect(screen.getByText(/made by 🦆 with the help of 🤖/i)).toBeInTheDocument();

        const twitterLink = screen.getByRole('link', { name: /juan on twitter/i });
        expect(twitterLink).toBeInTheDocument();
        expect(twitterLink).toHaveAttribute('href', 'https://twitter.com/juanmaromfe');

        const githubLink = screen.getByRole('link', { name: /juan on github/i });
        expect(githubLink).toBeInTheDocument();
        expect(githubLink).toHaveAttribute('href', 'https://github.com/juanmanuelromeraferrio');
    });
});
