import React from 'react'

import useStyles from './styles'

const EditBasicInstance = ({ open, handleClose }) => {
  const classes = useStyles()

  return <Dialog open={open} onClose={handleClose}></Dialog>
}
