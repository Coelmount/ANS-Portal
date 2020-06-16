import React from 'react'

import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import useStyles from './styles'

const TitleBlock = ({ handleOpen, titleData }) => {
  const classes = useStyles()
  const {
    mainText,
    iconCapture,
    Icon,
    buttonBlock,
    extraBlock,
    disabled
  } = titleData

  return (
    <Box className={classes.titleWrap}>
      <Typography className={classes.title} id='tableTitle'>
        {mainText}
      </Typography>
      {extraBlock}
      {Icon && iconCapture && (
        <Box className={classes.addCustomerWrap}>
          <Button
            variant='contained'
            color='primary'
            onClick={handleOpen}
            className={classes.iconButton}
            disabled={disabled}
          >
            {Icon}
          </Button>
          <Typography className={classes.addCustomerTitle}>
            {iconCapture}
          </Typography>
        </Box>
      )}
      {buttonBlock}
    </Box>
  )
}

export default TitleBlock
