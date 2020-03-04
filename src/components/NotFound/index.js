import React from 'react'
import { withRouter } from 'react-router'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

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
const NotFound = props => {
  const classes = useStyles()
  return (
    <div className='notFoundPageWrapper'>
      <DefaultLayout notFoundPage />
      <div className='notFoundWrapper'>
        <img src={page404} alt='no-ava' />
        <h2 className='notFoundTitle'>The page is not found...</h2>

        <Box className={classes.goBackButtonWrapper}>
          <Typography
            onClick={props.history.goBack}
            className={classes.goBackButtonTitle}
          >
            Go Back
          </Typography>
        </Box>
      </div>
    </div>
  )
}

export default withRouter(NotFound)
