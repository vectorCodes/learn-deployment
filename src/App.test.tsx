import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

vi.mock('gsap', () => ({
  default: {
    registerPlugin: vi.fn(),
    context: vi.fn((callback) => {
      callback();
      return { revert: vi.fn() };
    }),
    set: vi.fn(),
    to: vi.fn(),
    from: vi.fn(),
    fromTo: vi.fn(),
    utils: {
      toArray: vi.fn(() => []),
    },
    timeline: vi.fn(() => ({
      from: vi.fn().mockReturnThis(),
      to: vi.fn().mockReturnThis(),
      fromTo: vi.fn().mockReturnThis(),
    })),
  },
}));

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    create: vi.fn(),
  },
}));

vi.mock('motion/react', () => ({
  motion: {
    nav: ({ children, ...props }: React.PropsWithChildren<object>) => <nav {...props}>{children}</nav>,
    a: ({ children, ...props }: React.PropsWithChildren<object>) => <a {...props}>{children}</a>,
    span: ({ children, ...props }: React.PropsWithChildren<object>) => <span {...props}>{children}</span>,
  },
}));

describe('App', () => {
  it('renders Navbar component', () => {
    render(<App />);
    expect(screen.getAllByText('Brand.').length).toBeGreaterThanOrEqual(1);
  });

  it('renders Hero component', () => {
    render(<App />);
    expect(screen.getByText(/Build faster with/i)).toBeInTheDocument();
    expect(screen.getByText(/Intelligent Tools/i)).toBeInTheDocument();
  });

  it('renders Features component', () => {
    render(<App />);
    expect(screen.getByText('Powerful Features')).toBeInTheDocument();
  });

  it('renders DeployCTA component', () => {
    render(<App />);
    expect(screen.getByText('Ready to ship?')).toBeInTheDocument();
  });

  it('renders Footer component', () => {
    render(<App />);
    expect(screen.getByText(/Brand Inc. All rights reserved/i)).toBeInTheDocument();
  });

  it('renders all main sections', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 2 }).length).toBeGreaterThanOrEqual(2);
  });
});
