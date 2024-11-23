// src/pages/__tests__/Home.test.tsx
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Home from '../Home'

const HomeWithRouter = () => {
  return (
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  )
}

describe('Home', () => {
  it('renders hero section with correct content', () => {
    render(<HomeWithRouter />)
    
    // Check main heading
    expect(screen.getByText("Hey, I'm Sam 👋")).toBeInTheDocument()
    
    // Check intro text
    expect(screen.getByText(/Im a Fullstack engineer currently at Amazon/i)).toBeInTheDocument()
    expect(screen.getByText(/300,000 delivery drivers/i)).toBeInTheDocument()
    
    // Check "Read More" link
    const readMoreLink = screen.getByText(/Read More About My Work/i)
    expect(readMoreLink.closest('a')).toHaveAttribute('href', '/about')
  })

  it('renders tools section with all categories', () => {
    render(<HomeWithRouter />)
    
    expect(screen.getByText('Tools I Love Working With')).toBeInTheDocument()

    // Check all tool categories and their descriptions
    const toolCategories = [
      {
        title: 'Cloud & Backend',
        description: /AWS \(Lambda, ECS, DynamoDB\)/i
      },
      {
        title: 'Web & Mobile',
        description: /React, TypeScript, and mobile development/i
      },
      {
        title: 'Data & Systems',
        description: /Data pipelines, distributed systems/i
      }
    ]

    toolCategories.forEach(({ title, description }) => {
      expect(screen.getByText(title)).toBeInTheDocument()
      expect(screen.getByText(description)).toBeInTheDocument()
    })
  })

  it('renders projects section with correct projects', () => {
    render(<HomeWithRouter />)
    
    expect(screen.getByText("Some Things I've Built")).toBeInTheDocument()

    // Tello Drone Project
    expect(screen.getByText('Tello Map and Tag drone')).toBeInTheDocument()
    const telloLink = screen.getByText(/Watch it in action/i)
    expect(telloLink).toHaveAttribute('href', 'https://drive.google.com/file/d/19W7M81cVJW0UDy-F6nkbNOwDc1NKwjS5/view')
    expect(telloLink).toHaveAttribute('target', '_blank')
    expect(telloLink).toHaveAttribute('rel', 'noopener noreferrer')

    // Musical Joycons Project
    expect(screen.getByText('Musical Joycons')).toBeInTheDocument()
    
    const codeLink = screen.getByText('View Code →')
    expect(codeLink).toHaveAttribute('href', 'https://github.com/sarossilli/Musical-Joycons')
    expect(codeLink).toHaveAttribute('target', '_blank')
    
    const demoLink = screen.getByText('Watch Demo →')
    expect(demoLink).toHaveAttribute('href', 'https://youtu.be/Xy1yrnwEdZw?si=XEKPGoSgG6e3RAWS')
    expect(demoLink).toHaveAttribute('target', '_blank')
  })

  it('renders call-to-action with correct link', () => {
    render(<HomeWithRouter />)
    
    const ctaLink = screen.getByText(/See more of my work/i)
    expect(ctaLink.closest('a')).toHaveAttribute('href', '/projects')
  })

  it('verifies all external links have correct attributes', () => {
    render(<HomeWithRouter />)
    
    const externalLinks = screen.getAllByRole('link').filter(link => 
      link.getAttribute('href')?.startsWith('http')
    )
    
    externalLinks.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })
})