import React from 'react'

import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import useStyles from './styles'

const ExtendedTitleBlock = ({
  handleClick,
  handleTitleIconClick,
  titleData
}) => {
  const classes = useStyles()
  const {
    mainText,
    iconCapture,
    Icon,
    buttonBlock,
    extraBlock,
    titleIcon
  } = titleData

  return (
    <Box className={classes.wrap}>
      <Box className={classes.leftBlock}>
        <Typography className={classes.title}>{mainText}</Typography>
        {titleIcon && (
          <Box className={classes.leftIconWrap} onClick={handleTitleIconClick}>
            {titleIcon}
          </Box>
        )}
      </Box>

      {extraBlock}

      {Icon && iconCapture && (
        <Box className={classes.rightBlock}>
          <Box className={classes.iconWrap} onClick={handleClick}>
            {Icon}
          </Box>
          <Typography className={classes.rightBlockTitle}>
            {iconCapture}
          </Typography>
        </Box>
      )}
      {buttonBlock}
    </Box>
  )
}

export default ExtendedTitleBlock
