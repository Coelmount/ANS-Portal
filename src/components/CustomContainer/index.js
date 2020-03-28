import React, { Children } from 'react'

import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  wrap: {
    background: 'white',
    padding: '0px 33px 0px 68px',
    maxWidth: '1600px',
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 26
    }
  }
}))

const CustomContainer = ({ children }) => {
  const classes = useStyles()
  return (
    <Box className={classes.wrap}>{Children.map(children, child => child)}</Box>
  )
}

export default CustomContainer
