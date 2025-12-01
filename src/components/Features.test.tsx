import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Features from './Features';

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

describe('Features', () => {
  it('renders section heading', () => {
    render(<Features />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Powerful Features');
  });

  it('renders scroll instruction text', () => {
    render(<Features />);
    expect(screen.getByText('Scroll to explore')).toBeInTheDocument();
  });

  it('renders all feature cards', () => {
    render(<Features />);
    expect(screen.getByText('Instant Deployments')).toBeInTheDocument();
    expect(screen.getByText('Global Edge Network')).toBeInTheDocument();
    expect(screen.getByText('Analytics Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Automatic SSL')).toBeInTheDocument();
  });

  it('renders feature descriptions', () => {
    render(<Features />);
    expect(screen.getByText(/Push to git and your website is live/i)).toBeInTheDocument();
    expect(screen.getByText(/Your content is delivered from the edge/i)).toBeInTheDocument();
    expect(screen.getByText(/Real-time insights into your application/i)).toBeInTheDocument();
    expect(screen.getByText(/Every deployment automatically gets a free SSL/i)).toBeInTheDocument();
  });

  it('renders four feature cards', () => {
    const { container } = render(<Features />);
    const cards = container.querySelectorAll('.feature-card');
    expect(cards.length).toBe(4);
  });
});

