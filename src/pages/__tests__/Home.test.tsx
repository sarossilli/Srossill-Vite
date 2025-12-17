import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Home from '../Home'

// A pattern I've found invaluable for components that require routing context
const renderWithRouter = (ui: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {ui}
    </BrowserRouter>
  )
}

describe('Home', () => {
  // Pro tip: Breaking tests into logical groups improves maintainability
  describe('Hero Section', () => {
    beforeEach(() => {
      renderWithRouter(<Home />)
    })

    it('displays profile image with correct attributes', () => {
      const profileImage = screen.getByAltText('Sam Rossill')
      expect(profileImage).toBeInTheDocument()
      expect(profileImage).toHaveAttribute('src', '/profile.jpg')
      // Verify the container maintains aspect ratio
      const imageContainer = profileImage.parentElement
      expect(imageContainer).toHaveClass('w-40 h-40 rounded-full')
    })

    it('renders hero content with proper hierarchy', () => {
      const heading = screen.getByRole('heading', { 
        name: "Hey, I'm Sam 👋",
        level: 1 
      })
      expect(heading).toBeInTheDocument()
      
      // Testing semantic structure - crucial for accessibility
      expect(screen.getByText(/I'm a Fullstack engineer currently at Stellar Health/i))
        .toBeInTheDocument()
      
      const readMoreLink = screen.getByRole('link', { 
        name: /Read More About My Work/i 
      })
      expect(readMoreLink).toHaveAttribute('href', '/about')
    })
  })

  describe('Tools Section', () => {
    beforeEach(() => {
      renderWithRouter(<Home />)
    })

    it('presents technology categories with proper structure', () => {
      const categories = [
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

      categories.forEach(({ title, description }) => {
        const categoryHeading = screen.getByRole('heading', { name: title })
        expect(categoryHeading).toBeInTheDocument()
        expect(screen.getByText(description)).toBeInTheDocument()
        // Verify card structure
        const card = categoryHeading.closest('div')
        expect(card).toHaveClass('bg-gray-800', 'rounded-lg', 'border', 'border-gray-700')
      })
    })
  })

  describe('Projects Section', () => {
    beforeEach(() => {
      renderWithRouter(<Home />)
    })

    it('showcases projects with proper metadata and links', () => {
      // Verify project headings exist
      expect(screen.getByRole('heading', { name: 'Mira' })).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: 'Tello Map and Tag Drone' })).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: 'Musical Joycons' })).toBeInTheDocument()

      // Verify "View Code →" links (there are two: Mira and Musical Joycons)
      const viewCodeLinks = screen.getAllByRole('link', { name: 'View Code →' })
      expect(viewCodeLinks).toHaveLength(2)
      expect(viewCodeLinks[0]).toHaveAttribute('href', 'https://github.com/sarossilli/Mira-Monorepo')
      expect(viewCodeLinks[1]).toHaveAttribute('href', 'https://github.com/sarossilli/Musical-Joycons')

      // Verify other unique links
      const droneLink = screen.getByRole('link', { name: /Watch it in action/i })
      expect(droneLink).toHaveAttribute('href', 'https://drive.google.com/file/d/19W7M81cVJW0UDy-F6nkbNOwDc1NKwjS5/view')
      expect(droneLink).toHaveAttribute('target', '_blank')
      expect(droneLink).toHaveAttribute('rel', 'noopener noreferrer')

      const demoLink = screen.getByRole('link', { name: 'Watch Demo →' })
      expect(demoLink).toHaveAttribute('href', 'https://youtu.be/Xy1yrnwEdZw?si=XEKPGoSgG6e3RAWS')
      expect(demoLink).toHaveAttribute('target', '_blank')
      expect(demoLink).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  describe('Navigation and Accessibility', () => {
    it('ensures proper document structure and navigation flow', () => {
      renderWithRouter(<Home />)
      
      const mainCTA = screen.getByRole('link', { name: /See more of my work/i })
      expect(mainCTA).toHaveAttribute('href', '/blog')
      
      // Verify heading hierarchy - crucial for screen readers
      const headings = screen.getAllByRole('heading')
      expect(headings[0]).toHaveTextContent("Hey, I'm Sam 👋")
      expect(headings[0].tagName).toBe('H1')
    })

    it('validates external link security attributes', () => {
      renderWithRouter(<Home />)
      
      const externalLinks = screen.getAllByRole('link')
        .filter(link => link.getAttribute('href')?.startsWith('http'))
      
      expect(externalLinks.length).toBeGreaterThan(0)
      externalLinks.forEach(link => {
        expect(link).toHaveAttribute('target', '_blank')
        expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      })
    })
  })
})