import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Hero from './Hero';

vi.mock('gsap', () => ({
  default: {
    context: vi.fn((callback) => {
      callback();
      return { revert: vi.fn() };
    }),
    set: vi.fn(),
    to: vi.fn(),
    from: vi.fn(),
    timeline: vi.fn(() => ({
      from: vi.fn().mockReturnThis(),
      to: vi.fn().mockReturnThis(),
    })),
  },
}));

describe('Hero', () => {
  it('renders version badge', () => {
    render(<Hero />);
    expect(screen.getByText('v2.0 is now live')).toBeInTheDocument();
  });

  it('renders main heading', () => {
    render(<Hero />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/Build faster with/i)).toBeInTheDocument();
    expect(screen.getByText(/Intelligent Tools/i)).toBeInTheDocument();
  });

  it('renders description text', () => {
    render(<Hero />);
    expect(screen.getByText(/Deploy your applications in seconds/i)).toBeInTheDocument();
  });

  it('renders Start Building button', () => {
    render(<Hero />);
    expect(screen.getByRole('button', { name: 'Start Building' })).toBeInTheDocument();
  });

  it('renders Live Demo button', () => {
    render(<Hero />);
    expect(screen.getByRole('button', { name: 'Live Demo' })).toBeInTheDocument();
  });

  it('renders background shapes', () => {
    const { container } = render(<Hero />);
    const shapes = container.querySelectorAll('.rounded-full.blur-3xl');
    expect(shapes.length).toBe(4);
  });
});