import React, { Fragment } from 'react'
import { withNamespaces } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import CircularProgress from '@material-ui/core/CircularProgress'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import subaccountIcon from 'source/images/svg/users-subaccount.svg'
import customerIcon from 'source/images/svg/users-customer.svg'

const CurrentUser = ({
  t,
  classes,
  isUserLoading,
  userName,
  userSubtitle,
  customerStatus
}) => {
  const { customerId, groupId } = useParams()
  const history = useHistory()

  const redirectToDetailsPage = () => {
    if (customerId && groupId) {
      history.push(`/customers/${customerId}/subaccounts/${groupId}/details`)
      return
    }
    if (customerId) {
      history.push(`/customers/${customerId}/details`)
      return
    }
  }

  return (
    <Fragment>
      {isUserLoading && !userName ? (
        <CircularProgress className={classes.loadingIcon} />
      ) : (
        <Box className={classes.userWrap} onClick={redirectToDetailsPage}>
          <Typography className={classes.userSubtitle}>
            {userSubtitle.toUpperCase()}
          </Typography>
          <Box className={classes.userNameWrap}>
            <img
              className={classes.usersIcon}
              src={
                userSubtitle === 'subaccount' ? subaccountIcon : customerIcon
              }
              alt='users'
            />
            <span>{userName}</span>
          </Box>
          {customerStatus && (
            <Box className={classes.statusBox}>
              {customerStatus === 'Active' ? '' : t('account_suspended')}
            </Box>
          )}
        </Box>
      )}
    </Fragment>
  )
}

export default withNamespaces()(CurrentUser)
