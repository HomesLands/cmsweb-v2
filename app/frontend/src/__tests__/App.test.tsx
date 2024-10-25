// src/__tests__/App.test.tsx

import React from 'react'
import { render } from '@testing-library/react'
import App from '../App' // Adjust the path as necessary

// Mock the CSS and other modules as before
jest.mock('@/assets/index.css', () => ({}))
jest.mock('@/router', () => ({
  router: {
    // Mock router if necessary
  }
}))
jest.mock('./i18n', () => ({}))
jest.mock('@/utils', () => ({
  showErrorToast: jest.fn() // Mock function
}))

// Define a type for the ThemeProvider props
interface ThemeProviderProps {
  children: React.ReactNode // Specify the type for children
}

// Mock the ThemeProvider component
jest.mock('@/components/theme-provider', () => {
  return {
    ThemeProvider: ({ children }: ThemeProviderProps) => <div>{children}</div> // Use the defined type
  }
})

describe('App Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<App />)
    expect(container).toBeInTheDocument() // Check if App is rendered
  })
})
