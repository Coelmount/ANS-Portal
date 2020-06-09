import React from 'react'
import { withNamespaces } from 'react-i18next'
import { withRouter } from 'react-router'
import { useParams } from 'react-router-dom'

import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

const DetailsBlock = ({ classes, data, t, showOnly }) => {
  const match = useParams()
  const detailsFields = [
    {
      name: 'ID',
      value: data.tenantId || data.groupId || match.groupId || t('none'),
      showOnly: 'both'
    },
    {
      name: t('name'),
      value: data.name || data.groupName || t('none'),
      showOnly: 'both'
    },
    {
      name: t('account_status'),
      value: data.status || t('none'),
      styles:
        data.status === 'Active'
          ? classes.statusActive
          : classes.statusNotActive,
      showOnly: 'both'
    },
    {
      name: t('time_zone'),
      value: data.timeZone || t('none'),
      showOnly: 'group'
    }
  ]

  return (
    <Box className={classes.detailsBlock}>
      <Typography className={classes.detailsBlockTitle}>
        Customer Details
      </Typography>
      {detailsFields.map(
        detailsField =>
          (showOnly === detailsField.showOnly ||
            detailsField.showOnly === 'both') && (
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
          )
      )}
    </Box>
  )
}

export default withNamespaces()(withRouter(DetailsBlock))
