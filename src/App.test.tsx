import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the heading', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Vite + React')
  })

  it('renders the counter button with initial count of 0', () => {
    render(<App />)
    expect(screen.getByRole('button')).toHaveTextContent('count is 0')
  })

  it('increments the counter when button is clicked', () => {
    render(<App />)
    const button = screen.getByRole('button')

    fireEvent.click(button)
    expect(button).toHaveTextContent('count is 1')

    fireEvent.click(button)
    expect(button).toHaveTextContent('count is 2')
  })

  it('renders Vite and React logo links', () => {
    render(<App />)
    const links = screen.getAllByRole('link')

    expect(links).toHaveLength(2)
    expect(links[0]).toHaveAttribute('href', 'https://vite.dev')
    expect(links[1]).toHaveAttribute('href', 'https://react.dev')
  })
})
