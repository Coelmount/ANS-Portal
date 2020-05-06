import React from 'react'
import { withNamespaces } from 'react-i18next'
import classnames from 'classnames'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles(theme => ({
  defaultContainer: {
    paddingLeft: 68,
    paddingTop: 10,
    background: theme.palette.active.main
  },
  modalContainer: {
    paddingLeft: 44
  }
}))

const NoAvailableDataBlock = ({ messageText, isModal, t }) => {
  const classes = useStyles()
  return (
    <Box
      className={classnames(classes.defaultContainer, {
        [classes.modalContainer]: isModal
      })}
    >
      <Typography>{messageText}</Typography>
    </Box>
  )
}

export default withNamespaces()(NoAvailableDataBlock)
