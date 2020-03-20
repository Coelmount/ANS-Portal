import React from 'react'
import { withNamespaces } from 'react-i18next'
import { withRouter } from 'react-router'
import { useParams } from 'react-router-dom'

import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

const DetailsBlock = ({ classes, data, t }) => {
  const match = useParams()
  const detailsFields = [
    {
      name: 'ID',
      value: data.tenantId || data.groupId || match.groupId || 'none'
    },
    { name: t('name'), value: data.name || data.groupName },
    { name: t('status'), value: 'active' }
  ]

  return (
    <Box className={classes.detailsBlock}>
      <Typography className={classes.detailsBlockTitle}>
        Customer Details
      </Typography>
      {detailsFields.map(detailsField => (
        <Box
          className={`${classes.detailsFieldsWrap} ${classes.firstBlockFields}`}
          key={detailsField.name}
        >
          <Typography className={classes.fieldTitleBlock}>
            {`${detailsField.name}:`}
          </Typography>
          <Typography>{detailsField.value}</Typography>
        </Box>
      ))}
    </Box>
  )
}

export default withNamespaces()(withRouter(DetailsBlock))
