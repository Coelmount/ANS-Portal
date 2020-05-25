import React, { useState, useEffect, Fragment } from 'react'
import PhoneInput from 'react-phone-input-2'
import classnames from 'classnames'
import { observer } from 'mobx-react-lite'
import { useParams, useHistory } from 'react-router-dom'
import { withNamespaces } from 'react-i18next'
import { Link } from 'react-router-dom'

import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined'

import SnackbarStore from 'stores/Snackbar'
import BasicTranslationsStore from 'stores/BasicTranslations'
import ConfigStore from 'stores/Config'
import CustomContainer from 'components/CustomContainer'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'
import TitleBlock from 'components/TitleBlock'
import Input from 'components/Input'
import Loading from 'components/Loading'
import getCountryNameFromNumber from 'utils/phoneNumbers/getCountryNameFromNumber'
import getNsnFromNumber from 'utils/phoneNumbers/getNsnFromNumber'
import getCountryCodeFromNumber from 'utils/phoneNumbers/getCountryCodeFromNumber'

import arrowsIcon from 'source/images/svg/arrows.svg'
import useStyles from './styles'

const SingleNumber = observer(({ t }) => {
  const classes = useStyles()
  const match = useParams()
  const history = useHistory()
  const accessNumber = match.instanceNumber
  const accessCountry = getCountryNameFromNumber(accessNumber)

  const [currentInstance, setCurrentInstance] = useState(null)
  const [destinationNumber, setDestinationNumber] = useState('')
  const [destinationCountry, setDestinationCountry] = useState('')
  const [codeToSend, setCodeToSend] = useState('')
  const [nsnToSend, setNsnToSend] = useState('')
  const isSaveEnabled = destinationNumber.length > 6

  const {
    putInstance,
    basicTranslationsNumbers,
    getBasicTranslationsNumbers,
    isBasicTranslationsNumbersLoading,
    isPuttingInstance,
    isRedirectAfterPut,
    clearIsRedireactAfterPut
  } = BasicTranslationsStore

  // initial request
  useEffect(() => {
    getBasicTranslationsNumbers(match.customerId, match.groupId)
  }, [match.customerId, match.groupId, getBasicTranslationsNumbers])

  // find current object in array, set to state
  useEffect(() => {
    const currentNumber = basicTranslationsNumbers.find(
      item => item.access_number === accessNumber
    )
    setCurrentInstance(currentNumber)
    if (currentNumber) {
      const currentDestinationNumber = currentNumber.destination_number
      setDestinationCountry(currentNumber.destinationCountry)
      setDestinationNumber(currentDestinationNumber)

      const nsn = getNsnFromNumber(currentDestinationNumber)
      setNsnToSend(nsn)
      const code = getCountryCodeFromNumber(currentDestinationNumber)
      setCodeToSend(code)
    }
  }, [basicTranslationsNumbers])

  // if instance not exist on back
  useEffect(() => {
    if (!isBasicTranslationsNumbersLoading && currentInstance === undefined) {
      SnackbarStore.enqueueSnackbar({
        message: t('instance_not_exist'),
        options: {
          variant: 'info'
        }
      })
      history.push(
        `/customers/${match.customerId}/subaccounts/${match.groupId}/ans_instances/basic`
      )
    }
  }, [isBasicTranslationsNumbersLoading])

  // redirect if put request successfull
  useEffect(() => {
    if (isRedirectAfterPut) {
      history.push(
        `/customers/${match.customerId}/subaccounts/${match.groupId}/ans_instances/basic`
      )
    }
    return () => clearIsRedireactAfterPut()
  }, [isRedirectAfterPut])

  // onChange phone number input
  const handlePhoneInputChange = (value, data) => {
    if (data.dialCode) {
      const initValue = value.slice(data.dialCode.length)
      const formattedValue = initValue.replace(/\s/g, '')
      setDestinationNumber(value)
      setNsnToSend(formattedValue)
      setDestinationCountry(data.name)
      setCodeToSend(data.dialCode)
    }
  }

  const handleSaveButtonClick = () => {
    if (isSaveEnabled && currentInstance) {
      putInstance(
        match.customerId,
        match.groupId,
        currentInstance.ans_id,
        codeToSend,
        nsnToSend
      )
    }
  }

  const titleData = {
    mainText: accessNumber
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
                <Box className={classes.accessNumberWrap}>
                  <Input
                    value={accessNumber}
                    className={classes.input}
                    label={t('access_number')}
                    disabled
                  />
                </Box>

                <Input
                  value={accessCountry}
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
                <PhoneInput
                  value={destinationNumber}
                  onChange={(value, data) =>
                    handlePhoneInputChange(value, data)
                  }
                  placeholder={t('enter_number')}
                />
                <Input
                  value={destinationCountry}
                  className={`${classes.input} ${classes.bottomInput}`}
                  label={t('outbound_country')}
                  disabled
                />

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
