import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Footer from './Footer';

vi.mock('motion/react', () => ({
  motion: {
    a: ({ children, ...props }: React.PropsWithChildren<object>) => <a {...props}>{children}</a>,
  },
}));

describe('Footer', () => {
  it('renders brand name', () => {
    render(<Footer />);
    expect(screen.getByText('Brand.')).toBeInTheDocument();
  });

  it('renders tagline', () => {
    render(<Footer />);
    expect(screen.getByText(/Making deployment easy, fast, and secure/i)).toBeInTheDocument();
  });

  it('renders Product section with links', () => {
    render(<Footer />);
    expect(screen.getByText('Product')).toBeInTheDocument();
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();
    expect(screen.getByText('Documentation')).toBeInTheDocument();
  });

  it('renders Company section with links', () => {
    render(<Footer />);
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Careers')).toBeInTheDocument();
  });

  it('renders copyright with current year', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`${currentYear}`))).toBeInTheDocument();
    expect(screen.getByText(/Brand Inc. All rights reserved/i)).toBeInTheDocument();
  });

  it('renders social links', () => {
    render(<Footer />);
    expect(screen.getByText('Twitter')).toBeInTheDocument();
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('Discord')).toBeInTheDocument();
  });

  it('all links have href attributes', () => {
    render(<Footer />);
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveAttribute('href');
    });
  });
});

