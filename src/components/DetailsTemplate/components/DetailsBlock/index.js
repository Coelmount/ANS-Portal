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
      value: data.tenantId || data.groupId || match.groupId || t('none')
    },
    { name: t('name'), value: data.name || data.groupName || t('none') },
    {
      name: t('account_status'),
      value: data.status || t('none'),
      styles:
        data.status === 'Active'
          ? classes.statusActive
          : classes.statusNotActive
    }
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
          <Typography className={`${classes.fieldTitleBlock} `}>
            {`${detailsField.name}:`}
          </Typography>
          <Typography className={`${detailsField.styles} `}>
            {detailsField.value}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}

export default withNamespaces()(withRouter(DetailsBlock))
