import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { withNamespaces } from 'react-i18next'

import Paper from '@material-ui/core/Paper'
// import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import BasicTranslationsStore from 'stores/BasicTranslations'
import CustomContainer from 'components/CustomContainer'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'
import TitleBlock from 'components/TitleBlock'
import Input from 'components/Input'

import arrowsIcon from 'source/images/svg/arrows.svg'
import useStyles from './styles'

const SingleNumber = ({ t }) => {
  const classes = useStyles()
  const match = useParams()
  // const {
  //   currentInstance: { destinationNumber }
  // } = BasicTranslationsStore

  const defaultDestinationNumber = '+1231231313'
  const defaultInboundCountry = 'South Africa'
  const defaultOutboundCountry = 'USA'

  const [outboundCountry, setOutboundCountry] = useState(defaultOutboundCountry)
  const [destinationNumber, setDestinationNumber] = useState(
    defaultDestinationNumber
  )
  console.log(destinationNumber, outboundCountry)

  const titleData = {
    mainText: match.instanceNumber
  }

  return (
    <Box className={classes.root}>
      <Paper>
        <CustomContainer>
          <CustomBreadcrumbs />
          <TitleBlock titleData={titleData} />
        </CustomContainer>
        <Box className={classes.mainWrap}>
          <Box className={classes.inputsWrap}>
            <Box className={classes.leftBlock}>
              <Input
                value={match.instanceNumber}
                className={classes.input}
                label={t('access_number')}
              />

              <Input
                value={defaultInboundCountry}
                className={`${classes.input} ${classes.bottomInput}`}
                label={t('inbound_country')}
              />
            </Box>
            <img
              src={arrowsIcon}
              className={classes.arrowsIcon}
              alt='arrows icon'
            />
            <Box className={classes.rightBlock}>
              <Input
                defaultValue={destinationNumber}
                onChange={(e) => setDestinationNumber(e.target.value)}
                className={classes.input}
                label={t('destination')}
              />

              <Input
                defaultValue={outboundCountry}
                onChange={(e) => setOutboundCountry(e.target.value)}
                className={`${classes.input} ${classes.bottomInput}`}
                label={t('onbound_country')}
              />
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

export default withNamespaces()(SingleNumber)
