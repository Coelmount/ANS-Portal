import React from 'react'
import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'

import getHelperText from 'utils/getHelperText'

import useStyles from './styles'

const TitleBlock = ({
  handleOpen,
  titleData: {
    mainText,
    helperText: providedHelperText,
    iconCapture,
    Icon,
    buttonBlock,
    extraBlock,
    disabled,
    addButtonTooltipText
  },
  showHelper,
  showTooltip
}) => {
  const classes = useStyles()
  const { pathname } = useLocation()

  const formattedHelperText = getHelperText({
    title: mainText,
    pathname,
    providedHelperText
  })

  return (
    <Box className={classes.titleWrap}>
      <Box className={classes.leftTextWrap}>
        <Typography className={classes.title} id='tableTitle'>
          {mainText}
        </Typography>
        <Typography className={classes.helperText}>
          {showHelper ? formattedHelperText : ''}
        </Typography>
      </Box>
      <Box className={classes.rightBlockWrap}>
        {extraBlock}
        <Tooltip title={showTooltip ? addButtonTooltipText : ''}>
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
        </Tooltip>
        {buttonBlock}
      </Box>
    </Box>
  )
}

TitleBlock.propTypes = {
  showHelper: PropTypes.bool,
  showTooltip: PropTypes.bool
}

TitleBlock.defaultProps = {
  showHelper: true,
  showTooltip: false
}

export default TitleBlock
