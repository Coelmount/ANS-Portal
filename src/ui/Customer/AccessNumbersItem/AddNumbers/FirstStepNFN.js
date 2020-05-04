import React, { useEffect, useContext } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'
import { useParams } from 'react-router-dom'

import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import sharp from 'source/images/svg/sharp.svg'
import CallOutlined from '@material-ui/icons/CallOutlined'

import Input from 'components/Input'
import Select from 'components/Select'

import CustomerStore from 'stores/Customers'
import AccessNumbersStore from 'stores/AssignedNumbers'

import useStyles from './styles'
import Loading from 'components/Loading'

const FirstStepNFN = props => {
  const {
    handleClose,
    t,
    changeStep,
    queryAvalibleNumbers,
    setQueryAvalibleNumbers,
    searchAvalibleNumbers
  } = props
  const classes = useStyles()
  const match = useParams()

  const { customer, getCustomer, isLoadingCustomer } = CustomerStore
  const { currentEntitlement } = AccessNumbersStore

  useEffect(() => {
    getCustomer(match.customerId)
    setQueryAvalibleNumbers({
      ...queryAvalibleNumbers,
      country_code: currentEntitlement.country_code,
      number_type: currentEntitlement.number_type,
      service_capabilities: currentEntitlement.service_capabilities,
      range_size: ''
    })
  }, [])

  // if (isLoadingCustomer) {
  //   return <Loading />
  // }

  return (
    <React.Fragment>
      <DialogTitle className={classes.title}>
        {t('add_numbers_inv')}
        <IconButton
          aria-label='close'
          onClick={handleClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box className={classes.stepStyles}>{t('search_parameters')}</Box>
        <Box className={classes.searchParametersBox}>
          {/* <Select
            label={t('country')}
            wrapperStyles={classes.wrapperStylesSelect}
            options={[{ value: '+966', label: 'KSA' }]}
            onChange={e =>
              setQueryAvalibleNumbers({
                ...queryAvalibleNumbers,
                country_code: e.target.value
              })
            }
          />
          <Select
            label={t('type')}
            wrapperStyles={classes.wrapperStylesSelect}
            options={[{ value: 'geo', label: 'GEO' }]}
            onChange={e =>
              setQueryAvalibleNumbers({
                ...queryAvalibleNumbers,
                number_type: e.target.value
              })
            }
          /> */}
          <Box className={classes.rangeBox}>
            {`Range size (${currentEntitlement.entitlement -
              currentEntitlement.counter} max)`}
            <Input
              type='number'
              wrapperStyles={classes.rangeWrapperStylesInput}
              inputProps={{ min: 0, max: 70 }}
              onChange={e =>
                setQueryAvalibleNumbers({
                  ...queryAvalibleNumbers,
                  range_size: e.target.value
                })
              }
            />
          </Box>
          <Input
            wrapperStyles={classes.partNumberWrapperInput}
            helperText='Search by prefix, or characters you want in your phone number'
            placeholder={'A part of number'}
            onChange={e =>
              setQueryAvalibleNumbers({
                ...queryAvalibleNumbers,
                number_like: e.target.value
              })
            }
          />
          <Box className={classes.rangeBox}>
            {'How many suggestions do you want? '}
            <Input
              type='number'
              wrapperStyles={classes.rangeWrapperStylesInput}
              onChange={e =>
                setQueryAvalibleNumbers({
                  ...queryAvalibleNumbers,
                  numbers_of_results: e.target.value
                })
              }
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions className={classes.dialogActionsSecond}>
        <Button
          variant='outlined'
          color='primary'
          className={classes.backButton}
          onClick={() => handleClose()}
        >
          {t('cancel')}
        </Button>
        <Button
          variant='contained'
          color='primary'
          className={classes.nextButton}
          onClick={searchAvalibleNumbers}
        >
          {t('search')}
        </Button>
      </DialogActions>
    </React.Fragment>
  )
}

export default withNamespaces()(observer(FirstStepNFN))
