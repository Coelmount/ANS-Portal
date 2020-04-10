import React from 'react'
import { useHistory } from 'react-router-dom'
import { withNamespaces } from 'react-i18next'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import DefaultLayout from 'components/DefaultLayout'

import comingSoonSvg from 'source/images/svg/coming-soon.svg'
import './styles.css'

const useStyles = makeStyles((theme) => ({
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
const ComingSoon = ({ t }) => {
  const history = useHistory()
  const classes = useStyles()

  return (
    <div className='pageWrapper'>
      <DefaultLayout />
      <div className='comingSoonWrapper'>
        <img src={comingSoonSvg} alt='coming soon image' />
        <h2 className='title'>{t('coming_soon_title')}</h2>

        <Box className={classes.goBackButtonWrapper}>
          <Typography
            onClick={history.goBack}
            className={classes.goBackButtonTitle}
          >
            {t('go_back')}
          </Typography>
        </Box>
      </div>
    </div>
  )
}

export default withNamespaces()(ComingSoon)
