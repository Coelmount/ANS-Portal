import React from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { withNamespaces } from 'react-i18next'

import page403 from 'source/images/svg/403.svg'
import DefaultLayout from 'components/DefaultLayout'
import './styles.css'

const useStyles = makeStyles(theme => ({
  goBackButton: {
    width: 160,
    height: 50,
    borderRadius: 30
  },
  goBackButtonTitle: {
    fontFamily: 'MTN',
    fontStyle: 'normal',
    fontWeight: 500,
    color: theme.palette.black
  }
}))

const AccesDenied = ({ t }) => {
  const history = useHistory()
  const classes = useStyles()

  const goBackForShortHistory = () => {
    if (!!localStorage.getItem('ids')) {
      const ids = JSON.parse(localStorage.getItem('ids'))
      if (ids.tenant_id && ids.group_id) {
        history.push(
          `/customers/${ids.tenant_id}/subaccounts/${ids.group_id}/ans_instances`
        )
        return
      }
      if (ids.tenant_id) {
        history.push(`/customers/${ids.tenant_id}/access_numbers`)
        return
      }
    } else {
      history.push('/customers')
    }
  }

  return (
    <div className='AccessDeniedPageWrapper'>
      <DefaultLayout notFoundPage />
      <div className='AccessDeniedWrapper'>
        <img src={page403} alt='no-ava' />
        <h2 className='AccessDeniedTitle'>{t('access_denied')}</h2>
        {history.length >= 2 ? (
          <Button
            onClick={history.goBack}
            variant='outlined'
            color='primary'
            className={classes.goBackButton}
          >
            <Typography className={classes.goBackButtonTitle}>
              {t('go_back')}
            </Typography>
          </Button>
        ) : (
          <Button
            onClick={goBackForShortHistory}
            variant='outlined'
            color='primary'
            className={classes.goBackButton}
          >
            <Typography className={classes.goBackButtonTitle}>
              {t('go_to_main_page')}
            </Typography>
          </Button>
        )}
      </div>
    </div>
  )
}

export default withNamespaces()(AccesDenied)
