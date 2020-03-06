import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import useStyles from './styles'

const AddCustomerAdministrator = ({ handleClose, show }) => {
  const classes = useStyles()
  const showHideClassName = show ? classes.displayBlock : classes.displayNone

  return (
    <Box className={showHideClassName}>
      <Box className={classes.root}>
        <Box className={classes.modalMainWrapper}>
          <Typography>Add Customer Administrator</Typography>
        </Box>
        <button onClick={handleClose}>close</button>
      </Box>
    </Box>
  )
}
export default AddCustomerAdministrator
