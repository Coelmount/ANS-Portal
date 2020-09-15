import React from 'react'
import { useLocation } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

import getHelperText from 'utils/getHelperText'

const useStyles = makeStyles(theme => ({
  helperText: {
    fontSize: 14
  }
}))

const ModalHelperText = ({
  title,
  helperText: providedHelperText,
  userLevel: providedUserLevel
}) => {
  const classes = useStyles()
  const { pathname } = useLocation()

  const formattedHelperText = getHelperText({
    title,
    pathname,
    providedHelperText,
    providedUserLevel
  })

  return (
    <Typography className={classes.helperText}>
      {formattedHelperText}
    </Typography>
  )
}

export default ModalHelperText
