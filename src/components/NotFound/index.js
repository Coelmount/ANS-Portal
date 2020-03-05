import React from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { withNamespaces } from 'react-i18next'

import page404 from 'source/images/svg/404.svg'
import DefaultLayout from 'components/DefaultLayout'
import './styles.css'

const useStyles = makeStyles(theme => ({
  goBackButtonWrapper: {
    width: 140,
    height: 50,
    background: 'white',
    borderRadius: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: `1px solid ${theme.palette.primary.main}`,
    fontFamily: 'MTN',
    fontStyle: 'normal',
    fontWeight: 500,
    marginRight: 30,
    '&:hover': {
      cursor: 'pointer'
    }
  },
  goBackButtonTitle: {
    fontFamily: 'MTN',
    fontStyle: 'normal',
    fontWeight: 500
  }
}))
const NotFound = ({ t }) => {
  const history = useHistory()
  const classes = useStyles()
  return (
    <div className='notFoundPageWrapper'>
      <DefaultLayout notFoundPage />
      <div className='notFoundWrapper'>
        <img src={page404} alt='no-ava' />
        <h2 className='notFoundTitle'>{t('not_found')}</h2>
        {console.log(history.length)}
        <Box className={classes.goBackButtonWrapper}>
          {history.length >= 2 ? (
            <Typography
              onClick={history.goBack}
              className={classes.goBackButtonTitle}
            >
              {t('go_back')}
            </Typography>
          ) : (
            <Typography
              onClick={() => {
                history.push('/')
              }}
              className={classes.goBackButtonTitle}
            >
              Go to main page
            </Typography>
          )}
        </Box>
      </div>
    </div>
  )
}

export default withNamespaces()(NotFound)
