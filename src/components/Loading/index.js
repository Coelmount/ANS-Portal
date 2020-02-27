import React from 'react'

import CircularProgress from '@material-ui/core/CircularProgress'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, 50%)'
  }
}))

const Loading = () => {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <CircularProgress />
    </Box>
  )
}

export default Loading
