import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import { SnackbarProvider } from 'notistack'
import theme from './theme'
import './index.css'

import Router from './router'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <div className='app'>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </div>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default App
