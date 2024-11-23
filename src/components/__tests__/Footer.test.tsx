import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Footer from '../Footer'

const FooterWithRouter = () => {
  return (
    <BrowserRouter>
      <Footer />
    </BrowserRouter>
  )
}

describe('Footer', () => {
  it('renders copyright info', () => {
    render(<FooterWithRouter />)
    
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(`© ${currentYear} Sam Rossilli`)).toBeInTheDocument()
  })

  it('renders social links with correct hrefs', () => {
    render(<FooterWithRouter />)
    
    // Check if social links are present using aria-labels
    const githubLink = screen.getByLabelText('GitHub Profile')
    const linkedinLink = screen.getByLabelText('LinkedIn Profile')
    const adminLink = screen.getByLabelText('Admin Login')
    
    expect(githubLink).toHaveAttribute('href', 'https://github.com/sarossilli')
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/sarossilli')
    expect(adminLink).toHaveAttribute('href', '/admin')
  })

  it('opens external links in new tab', () => {
    render(<FooterWithRouter />)
    
    const externalLinks = [
      screen.getByLabelText('GitHub Profile'),
      screen.getByLabelText('LinkedIn Profile')
    ]
    
    externalLinks.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  it('does not open admin link in new tab', () => {
    render(<FooterWithRouter />)
    
    const adminLink = screen.getByLabelText('Admin Login')
    expect(adminLink).not.toHaveAttribute('target')
  })
})