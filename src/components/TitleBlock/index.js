import React from 'react'

import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import useStyles from './styles'

const TitleBlock = ({ handleOpen, titleData }) => {
  const classes = useStyles()
  const { mainText, iconCapture, Icon } = titleData

  return (
    <Box className={classes.titleWrap}>
      <Typography className={classes.title} id='tableTitle'>
        {mainText}
      </Typography>
      <Box className={classes.addCustomerWrap}>
        <Box className={classes.addIconWrap} onClick={handleOpen}>
          {Icon}
        </Box>
        <Typography className={classes.addCustomerTitle}>
          {iconCapture}
        </Typography>
      </Box>
    </Box>
  )
}

export default TitleBlock
