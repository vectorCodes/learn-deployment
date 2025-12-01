import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the Hero component with correct title', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Build Something Amazing')
  })

  it('renders the Hero subtitle', () => {
    render(<App />)
    expect(screen.getByText(/modern React application powered by Vite/i)).toBeInTheDocument()
  })

  it('renders Get Started and Learn More buttons', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: 'Get Started' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Learn More' })).toBeInTheDocument()
  })

  it('renders buttons with correct links', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: 'Get Started' })).toHaveAttribute('href', '#get-started')
    expect(screen.getByRole('link', { name: 'Learn More' })).toHaveAttribute('href', '#learn-more')
  })
})
