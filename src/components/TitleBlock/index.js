import React from 'react'

import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import getHelperText from 'utils/getHelperText'

import useStyles from './styles'

const TitleBlock = ({
  handleOpen,
  titleData: {
    mainText,
    helperText,
    iconCapture,
    Icon,
    buttonBlock,
    extraBlock,
    disabled
  }
}) => {
  const classes = useStyles()

  const formattedHelperText = getHelperText(mainText, helperText)

  return (
    <Box className={classes.titleWrap}>
      <Box className={classes.leftTextWrap}>
        <Typography className={classes.title} id='tableTitle'>
          {mainText}
        </Typography>
        <Typography className={classes.helperText}>
          {formattedHelperText}
        </Typography>
      </Box>
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
