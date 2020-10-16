import React, { useState, useEffect, Fragment } from 'react'
import classnames from 'classnames'
import { observer } from 'mobx-react-lite'
import { useParams, useHistory } from 'react-router-dom'
import { withNamespaces } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useLocalStore } from 'mobx-react-lite'

import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined'
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'

// import SnackbarStore from 'stores/Snackbar'
import BasicTranslationsStore from 'stores/BasicTranslations'
import CustomContainer from 'components/CustomContainer'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'
import TitleBlock from 'components/TitleBlock'
import Input from 'components/Input'
import Loading from 'components/Loading'
import getCountryNameFromNumber from 'utils/phoneNumbers/getCountryNameFromNumber'

import arrowsIcon from 'source/images/svg/arrows.svg'
import useStyles from './styles'

const SingleNumber = observer(({ t }) => {
  const classes = useStyles()
  const match = useParams()
  const history = useHistory()

  const {
    putInstance,
    basicTranslationsNumbers,
    getBasicTranslationsNumbers,
    isBasicTranslationsNumbersLoading,
    isPuttingInstance
  } = BasicTranslationsStore

  const [currentInstance, setCurrentInstance] = useState('')

  const localStore = useLocalStore(() => ({
    phoneNumber: '',
    setPhoneNumber(number) {
      this.phoneNumber = number
    },
    get calculateNumberType() {
      if (!this.phoneNumber.length) return 'None'

      if (
        this.phoneNumber.startsWith('+999') ||
        this.phoneNumber.startsWith('00999')
      ) {
        return 'Onward routing'
      } else if (
        this.phoneNumber.startsWith('+') ||
        this.phoneNumber.startsWith('00')
      ) {
        return 'International call forwarding'
      }
      return 'Custom routing'
    }
  }))

  const accessNumber = match.instanceNumber
  const accessCountry = getCountryNameFromNumber(accessNumber)
  const isSaveEnabled = localStore.phoneNumber

  // Initial request
  useEffect(() => {
    getBasicTranslationsNumbers(match.customerId, match.groupId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Find and set currentInstance after receive from request
  useEffect(() => {
    const currentNumber = basicTranslationsNumbers.find(
      item => item.access_number === accessNumber
    )

    if (currentNumber) {
      setCurrentInstance(currentNumber)
      localStore.setPhoneNumber(currentNumber.destination_number)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [basicTranslationsNumbers])

  const handleSaveButtonClick = () => {
    if (isSaveEnabled) {
      putInstance(
        match.customerId,
        match.groupId,
        currentInstance.ans_id,
        localStore.phoneNumber,
        history
      )
    }
  }

  const handlePhoneNumberChange = e => {
    const value = e.target.value
    // Starts from + or number then only numbers
    const reg = /^[+\d]?(?:[\d-.\s()]*)$/

    if (value.length > 30) return
    if (reg.test(value) || value === '') {
      localStore.setPhoneNumber(value)
    }
  }

  const titleData = {
    mainText: accessNumber,
    helperText: 'basic_translations_instance'
  }

  return (
    <Fragment>
      {isBasicTranslationsNumbersLoading || isPuttingInstance ? (
        <Loading />
      ) : (
        <Box className={classes.root}>
          <Paper>
            <CustomContainer>
              <CustomBreadcrumbs />
              <TitleBlock titleData={titleData} />
            </CustomContainer>
            <Box className={classes.inputsWrap}>
              <Box className={classes.leftBlock}>
                <div className={classes.accessNumberContainer}>
                  <span>{`${t('access_number')}:`}</span>
                  <Input value={accessNumber} disabled />
                </div>

                <div className={classes.inboundCountryContainer}>
                  <span>{`${t('inbound_country')}:`}</span>
                  <Input value={accessCountry} disabled />
                </div>
              </Box>

              <img
                src={arrowsIcon}
                className={classes.arrowsIcon}
                alt='arrows icon'
              />

              <Box className={classes.rightBlock}>
                <div className={classes.destinationNumberContainer}>
                  <span>{`${t('destination_number')}:`}</span>
                  <Input
                    value={localStore.phoneNumber}
                    onChange={handlePhoneNumberChange}
                    placeholder={t('enter_number')}
                    icon={<PhoneOutlinedIcon alt='phone' />}
                    disabled={!isSaveEnabled}
                  />
                </div>
                <div className={classes.numberTypeContainer}>
                  <span>{`${t('number_type')}:`}</span>
                  <Input
                    value={localStore.calculateNumberType}
                    placeholder={t('enter_number')}
                    icon={<LocationOnOutlinedIcon alt='location' />}
                    disabled
                  />
                </div>

                <Box className={classes.buttonsWrap}>
                  <Box className={classes.buttonBlock}>
                    <Link
                      to={`/customers/${match.customerId}/subaccounts/${match.groupId}/ans_instances/basic`}
                    >
                      <IconButton
                        aria-label='cancel icon button'
                        component='span'
                        className={classnames(
                          classes.buttonIconWrap,
                          classes.cancelButtonWrap
                        )}
                      >
                        <CloseOutlinedIcon className={classes.cancelIcon} />
                      </IconButton>
                    </Link>
                    <Typography className={classes.buttonLabel}>
                      {t('cancel')}
                    </Typography>
                  </Box>

                  <Box
                    className={`${classes.buttonBlock} ${classes.doneButtonBlock}`}
                  >
                    <IconButton
                      aria-label='save icon button'
                      component='span'
                      className={classnames(
                        classes.buttonIconWrap,
                        classes.asignButtonWrap,
                        {
                          [classes.disabledButton]: !isSaveEnabled
                        }
                      )}
                      onClick={handleSaveButtonClick}
                    >
                      <DoneOutlinedIcon className={classes.assignIcon} />
                    </IconButton>
                    <Typography className={classes.buttonLabel}>
                      {t('save')}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Box>
      )}
    </Fragment>
  )
})

export default withNamespaces()(SingleNumber)
