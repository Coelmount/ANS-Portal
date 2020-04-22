import React from 'react'
import { withNamespaces } from 'react-i18next'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles((theme) => ({
  container: {
    paddingLeft: 68,
    paddingTop: 5,
    background: theme.palette.active.main
  }
}))

const NoAvailableDataBlock = ({ t }) => {
  const classes = useStyles()
  return (
    <Box className={classes.container}>
      <Typography className={classes.title}>
        {t('no_available_data')}
      </Typography>
    </Box>
  )
}

export default withNamespaces()(NoAvailableDataBlock)
