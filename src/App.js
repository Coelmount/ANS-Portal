import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './theme'
import './index.css'

import Router from './router'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className='app'>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </div>
    </ThemeProvider>
  )
}

export default App
