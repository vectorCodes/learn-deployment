import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import DeployCTA from './DeployCTA';

vi.mock('gsap', () => ({
  default: {
    context: vi.fn((callback) => {
      callback();
      return { revert: vi.fn() };
    }),
    set: vi.fn(),
    to: vi.fn(),
    from: vi.fn(),
    fromTo: vi.fn(),
    timeline: vi.fn(() => ({
      from: vi.fn().mockReturnThis(),
      to: vi.fn().mockReturnThis(),
    })),
  },
}));

vi.mock('motion/react', () => ({
  motion: {
    span: ({ children, ...props }: React.PropsWithChildren<object>) => <span {...props}>{children}</span>,
  },
}));

describe('DeployCTA', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders section heading', () => {
    render(<DeployCTA />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Ready to ship?');
  });

  it('renders description text', () => {
    render(<DeployCTA />);
    expect(screen.getByText(/Experience the fastest deployment pipeline/i)).toBeInTheDocument();
  });

  it('renders Deploy to Production button in idle state', () => {
    render(<DeployCTA />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Deploy to Production')).toBeInTheDocument();
  });

  it('renders terminal window', () => {
    render(<DeployCTA />);
    expect(screen.getByText('~ project deploy')).toBeInTheDocument();
  });

  it('renders terminal window dots', () => {
    const { container } = render(<DeployCTA />);
    const dots = container.querySelectorAll('.rounded-full');
    expect(dots.length).toBeGreaterThanOrEqual(3);
  });

  it('changes to building state when button is clicked', async () => {
    render(<DeployCTA />);
    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Building...')).toBeInTheDocument();
    });
  });

  it('shows terminal output when building', async () => {
    render(<DeployCTA />);
    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Initializing build environment/i)).toBeInTheDocument();
      expect(screen.getByText(/Installing dependencies/i)).toBeInTheDocument();
    });
  });

  it('button is disabled after clicking', async () => {
    render(<DeployCTA />);
    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(button).toBeDisabled();
    });
  });
});

