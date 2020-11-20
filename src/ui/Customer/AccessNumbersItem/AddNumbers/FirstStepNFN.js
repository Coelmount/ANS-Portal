import React, { useEffect } from 'react'
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
import Tooltip from '@material-ui/core/Tooltip'

import Input from 'components/Input'
import ModalHelperText from 'components/ModalHelperText'
import Loading from 'components/Loading'

import CustomerStore from 'stores/Customers'
import AssignedNumbersStore from 'stores/AssignedNumbers'
import NumbersStore from 'stores/Numbers'

import useStyles from './styles'

const FirstStepNFN = props => {
  const {
    handleClose,
    t,
    queryAvalibleNumbers,
    setQueryAvalibleNumbers,
    searchAvalibleNumbers,
    maxRangeSize
  } = props

  const classes = useStyles()
  const match = useParams()

  const { getCustomer } = CustomerStore
  const { currentEntitlement } = AssignedNumbersStore
  const { isLoadingAvailableNumbers } = NumbersStore

  // Disabled if page loading proceed or range size/number_of_results not exist
  const isSearchButtonDisabled =
    queryAvalibleNumbers.range_size < 1 ||
    queryAvalibleNumbers.number_of_results < 1 ||
    isLoadingAvailableNumbers

  useEffect(() => {
    getCustomer(match.customerId)
    setQueryAvalibleNumbers({
      ...queryAvalibleNumbers,
      country_code: currentEntitlement.country_code,
      number_type: currentEntitlement.number_type,
      service_capabilities: currentEntitlement.service_capabilities,
      range_size: `${maxRangeSize}`
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoadingAvailableNumbers) return <Loading />

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
      <DialogContent className={classes.dialogContent}>
        <ModalHelperText title='add_numbers_inv' />
        <Box className={classes.stepStyles}>{t('search_parameters')}</Box>
        <Box className={classes.searchParametersBox}>
          <Box className={classes.rangeBox}>
            {`Range size (${maxRangeSize} max)`}
            <Input
              type='number'
              wrapperStyles={classes.rangeWrapperStylesInput}
              inputProps={{
                min: 0,
                max: maxRangeSize
              }}
              onChange={e =>
                setQueryAvalibleNumbers({
                  ...queryAvalibleNumbers,
                  range_size: e.target.value
                })
              }
              defaultValue={maxRangeSize}
            />
          </Box>
          <Input
            wrapperStyles={classes.partNumberWrapperInput}
            helperText='Search by prefix, or characters you want in your phone number'
            placeholder={'A part of number'}
            onChange={e =>
              setQueryAvalibleNumbers({
                ...queryAvalibleNumbers,
                starts_with: e.target.value
              })
            }
          />
          <Box className={classes.rangeBox}>
            {'How many suggestions do you want? '}
            <Input
              type='number'
              wrapperStyles={classes.rangeWrapperStylesInput}
              inputProps={{
                min: 0
              }}
              onChange={e =>
                setQueryAvalibleNumbers({
                  ...queryAvalibleNumbers,
                  number_of_results: e.target.value
                })
              }
              defaultValue={1}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions className={classes.dialogActionsSecond}>
        <Button
          variant='outlined'
          color='primary'
          className={classes.backButton}
          disabled={isLoadingAvailableNumbers}
          onClick={() => handleClose()}
        >
          {t('cancel')}
        </Button>
        <Tooltip
          title={
            isSearchButtonDisabled
              ? t('add_numbers_search_button_disabled_tooltip')
              : ''
          }
        >
          <span>
            <Button
              variant='contained'
              color='primary'
              className={classes.nextButton}
              disabled={isSearchButtonDisabled}
              onClick={searchAvalibleNumbers}
            >
              {t('search')}
            </Button>
          </span>
        </Tooltip>
      </DialogActions>
    </React.Fragment>
  )
}

export default withNamespaces()(observer(FirstStepNFN))
