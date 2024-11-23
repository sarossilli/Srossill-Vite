import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Header from '../Header'

// Wrapper to provide router context
const HeaderWithRouter = () => {
  return (
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  )
}

describe('Header', () => {
  it('renders the logo and name', () => {
    const { container } = render(<HeaderWithRouter />)
    
    // Check if Sam Rossilli text is present
    expect(screen.getByText('Sam Rossilli')).toBeInTheDocument()
    
    // Check if logo is present (using container query)
    expect(screen.getByTestId('logo')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<HeaderWithRouter />)
    
    // Check if all navigation links are present
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Blog')).toBeInTheDocument()
  })

  it('has correct navigation hrefs', () => {
    render(<HeaderWithRouter />)
    
    // Check if links have correct href attributes
    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/')
    expect(screen.getByText('Projects').closest('a')).toHaveAttribute('href', '/projects')
    expect(screen.getByText('About').closest('a')).toHaveAttribute('href', '/about')
    expect(screen.getByText('Blog').closest('a')).toHaveAttribute('href', '/blog')
  })
})