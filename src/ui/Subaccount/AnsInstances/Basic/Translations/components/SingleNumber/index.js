import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { withNamespaces } from 'react-i18next'

import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'

import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined'

import BasicTranslationsStore from 'stores/BasicTranslations'
import CustomContainer from 'components/CustomContainer'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'
import TitleBlock from 'components/TitleBlock'
import Input from 'components/Input'

import editIcon from 'source/images/svg/edit-blue.svg'
import arrowsIcon from 'source/images/svg/arrows.svg'
import useStyles from './styles'
import { Typography } from '@material-ui/core'

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
        <Box className={classes.inputsWrap}>
          <Box className={classes.leftBlock}>
            <Box className={classes.accessNumberWrap}>
              <Input
                value={match.instanceNumber}
                className={classes.input}
                label={t('access_number')}
              />
              <Box className={classes.editIconWrap}>
                <img src={editIcon} alt='edit icon'></img>
              </Box>
            </Box>

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

            <Box className={classes.buttonsWrap}>
              <Box className={classes.buttonBlock}>
                <Box className={`${classes.iconWrap} ${classes.closeIconWrap}`}>
                  <CloseOutlinedIcon className={classes.icon} />
                </Box>
                <Typography className={classes.buttonLabel}>
                  {t('cancel')}
                </Typography>
              </Box>

              <Box
                className={`${classes.buttonBlock} ${classes.doneButtonBlock}`}
              >
                <Box className={`${classes.iconWrap} ${classes.doneIconWrap}`}>
                  <DoneOutlinedIcon className={classes.icon} />
                </Box>
                <Typography className={classes.buttonLabel}>
                  {t('save')}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

export default withNamespaces()(SingleNumber)
