import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { withNamespaces } from 'react-i18next'
import { Link } from 'react-router-dom'

import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined'

import BasicTranslationsStore from 'stores/BasicTranslations'
import CustomContainer from 'components/CustomContainer'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'
import TitleBlock from 'components/TitleBlock'
import Input from 'components/Input'
import EditAccessNumber from './components/EditAccessNumber'

import editIcon from 'source/images/svg/edit-blue.svg'
import arrowsIcon from 'source/images/svg/arrows.svg'
import useStyles from './styles'

const SingleNumber = ({ t }) => {
  const classes = useStyles()
  const match = useParams()
  const history = useHistory()

  const { selectedInstance, postAccessNumber } = BasicTranslationsStore
  const defaultDestinationNumber = '+1231231313'
  const defaultOutboundCountry = 'USA'

  const [outboundCountry, setOutboundCountry] = useState(defaultOutboundCountry)
  const [destinationNumber, setDestinationNumber] = useState(
    defaultDestinationNumber
  )
  const [
    isEditAccessNumberModalOpen,
    setIsEditAccessNumberModalOpen
  ] = useState(false)

  const titleData = {
    mainText: match.instanceNumber
  }

  const handleEditIconClick = () => {
    setIsEditAccessNumberModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsEditAccessNumberModalOpen(false)
  }

  const handleSaveButtonClick = () => {
    const callback = history.push(
      `/customers/${match.customerId}/subaccounts/${match.groupId}/ans_instances/basic/translations`
    )
    if (
      selectedInstance.accessNumber &&
      selectedInstance.accessCountry &&
      outboundCountry &&
      destinationNumber
    ) {
      postAccessNumber(callback)
    } else console.log('error')
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
                value={
                  (selectedInstance && selectedInstance.accessNumber) ||
                  match.instanceNumber
                }
                className={classes.input}
                label={t('access_number')}
                disabled
              />
              <Box
                onClick={handleEditIconClick}
                className={classes.editIconWrap}
              >
                <img src={editIcon} alt='edit icon'></img>
              </Box>
            </Box>

            <Input
              value={selectedInstance && selectedInstance.accessCountry}
              className={`${classes.input} ${classes.bottomInput}`}
              label={t('inbound_country')}
              disabled
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
              label={t('destination_phone_number')}
            />

            <Input
              defaultValue={outboundCountry}
              onChange={(e) => setOutboundCountry(e.target.value)}
              className={`${classes.input} ${classes.bottomInput}`}
              label={t('outbound_country')}
            />

            <Box className={classes.buttonsWrap}>
              <Box className={classes.buttonBlock}>
                <Link
                  to={`/customers/${match.customerId}/subaccounts/${match.groupId}/ans_instances/basic/translations`}
                >
                  <Box
                    className={`${classes.iconWrap} ${classes.closeIconWrap}`}
                  >
                    <CloseOutlinedIcon className={classes.icon} />
                  </Box>
                </Link>
                <Typography className={classes.buttonLabel}>
                  {t('cancel')}
                </Typography>
              </Box>

              <Box
                className={`${classes.buttonBlock} ${classes.doneButtonBlock}`}
              >
                <Box
                  onClick={handleSaveButtonClick}
                  className={`${classes.iconWrap} ${classes.doneIconWrap}`}
                >
                  <DoneOutlinedIcon
                    className={`${classes.icon} ${classes.doneIcon}`}
                  />
                </Box>
                <Typography className={classes.buttonLabel}>
                  {t('save')}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        {isEditAccessNumberModalOpen && (
          <EditAccessNumber
            open={isEditAccessNumberModalOpen}
            handleClose={handleCloseModal}
            defaultInboundCountry={selectedInstance.accessCountry}
          />
        )}
      </Paper>
    </Box>
  )
}

export default withNamespaces()(SingleNumber)
