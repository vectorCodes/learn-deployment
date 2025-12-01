import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Navbar from './Navbar';

vi.mock('motion/react', () => ({
  motion: {
    nav: ({ children, ...props }: React.PropsWithChildren<object>) => <nav {...props}>{children}</nav>,
  },
}));

describe('Navbar', () => {
  beforeEach(() => {
    vi.stubGlobal('scrollY', 0);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders brand logo', () => {
    render(<Navbar />);
    expect(screen.getByText('Brand.')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Navbar />);
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Testimonials')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders Get Started button', () => {
    render(<Navbar />);
    expect(screen.getByRole('button', { name: 'Get Started' })).toBeInTheDocument();
  });

  it('navigation links have correct href attributes', () => {
    render(<Navbar />);
    expect(screen.getByText('Features').closest('a')).toHaveAttribute('href', '#features');
    expect(screen.getByText('About').closest('a')).toHaveAttribute('href', '#about');
    expect(screen.getByText('Testimonials').closest('a')).toHaveAttribute('href', '#testimonials');
    expect(screen.getByText('Contact').closest('a')).toHaveAttribute('href', '#contact');
  });
});

