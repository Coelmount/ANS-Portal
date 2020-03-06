import React from 'react'

import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined'

const TitleBlock = ({ classes, handleOpen, titleData }) => {
  const { mainText, iconCapture } = titleData

  return (
    <Box className={classes.titleWrap}>
      <Typography className={classes.title} id='tableTitle'>
        {mainText}
      </Typography>
      <Box className={classes.addCustomerWrap}>
        <Box className={classes.addIconWrap} onClick={handleOpen}>
          <PersonAddOutlinedIcon className={classes.addIcon} />
        </Box>
        <Typography className={classes.addCustomerTitle}>
          {iconCapture}
        </Typography>
      </Box>
    </Box>
  )
}

export default TitleBlock
