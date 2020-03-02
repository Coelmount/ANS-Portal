import React from 'react'
import { withNamespaces } from 'react-i18next'

import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined'

const TitleBlock = ({ classes, t, handleOpen }) => {
  return (
    <Box className={classes.titleWrap}>
      <Typography className={classes.title} id='tableTitle'>
        {t('ans_customers')}
      </Typography>
      <Box className={classes.addCustomerWrap}>
        <Box className={classes.addIconWrap}>
          <PersonAddOutlinedIcon
            className={classes.addIcon}
            onClick={handleOpen}
          />
        </Box>
        <Typography className={classes.addCustomerTitle}>
          {t('add_customer')}
        </Typography>
      </Box>
    </Box>
  )
}

export default withNamespaces()(TitleBlock)
