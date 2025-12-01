import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Hero from './Hero'

describe('Hero', () => {
  it('renders the title', () => {
    render(<Hero title="Test Title" />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Test Title')
  })

  it('renders the subtitle when provided', () => {
    render(<Hero title="Title" subtitle="Test subtitle text" />)
    expect(screen.getByText('Test subtitle text')).toBeInTheDocument()
  })

  it('does not render subtitle when not provided', () => {
    render(<Hero title="Title" />)
    const subtitle = document.querySelector('.hero__subtitle')
    expect(subtitle).not.toBeInTheDocument()
  })

  it('renders primary button when primaryButtonText is provided', () => {
    render(<Hero title="Title" primaryButtonText="Click Me" />)
    const button = screen.getByRole('link', { name: 'Click Me' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('hero__button--primary')
  })

  it('renders primary button with correct link', () => {
    render(<Hero title="Title" primaryButtonText="Click Me" primaryButtonLink="/test" />)
    const button = screen.getByRole('link', { name: 'Click Me' })
    expect(button).toHaveAttribute('href', '/test')
  })

  it('renders secondary button when secondaryButtonText is provided', () => {
    render(<Hero title="Title" secondaryButtonText="Learn More" />)
    const button = screen.getByRole('link', { name: 'Learn More' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('hero__button--secondary')
  })

  it('renders secondary button with correct link', () => {
    render(<Hero title="Title" secondaryButtonText="Learn More" secondaryButtonLink="/about" />)
    const button = screen.getByRole('link', { name: 'Learn More' })
    expect(button).toHaveAttribute('href', '/about')
  })

  it('renders both buttons when both are provided', () => {
    render(
      <Hero
        title="Title"
        primaryButtonText="Primary"
        secondaryButtonText="Secondary"
      />
    )
    expect(screen.getByRole('link', { name: 'Primary' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Secondary' })).toBeInTheDocument()
  })

  it('does not render buttons container when no buttons provided', () => {
    render(<Hero title="Title" />)
    const buttonsContainer = document.querySelector('.hero__buttons')
    expect(buttonsContainer).not.toBeInTheDocument()
  })

  it('applies gradient background variant by default', () => {
    render(<Hero title="Title" />)
    const hero = document.querySelector('.hero')
    expect(hero).toHaveClass('hero--gradient')
  })

  it('applies solid background variant when specified', () => {
    render(<Hero title="Title" backgroundVariant="solid" />)
    const hero = document.querySelector('.hero')
    expect(hero).toHaveClass('hero--solid')
  })

  it('applies mesh background variant when specified', () => {
    render(<Hero title="Title" backgroundVariant="mesh" />)
    const hero = document.querySelector('.hero')
    expect(hero).toHaveClass('hero--mesh')
  })

  it('renders glow elements for visual effects', () => {
    render(<Hero title="Title" />)
    expect(document.querySelector('.hero__glow--1')).toBeInTheDocument()
    expect(document.querySelector('.hero__glow--2')).toBeInTheDocument()
  })

  it('uses default href "#" when button links are not provided', () => {
    render(<Hero title="Title" primaryButtonText="Primary" secondaryButtonText="Secondary" />)
    expect(screen.getByRole('link', { name: 'Primary' })).toHaveAttribute('href', '#')
    expect(screen.getByRole('link', { name: 'Secondary' })).toHaveAttribute('href', '#')
  })
})
