import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { withNamespaces } from 'react-i18next'
import { useParams } from 'react-router-dom'

import Loading from 'components/Loading'
import Select from 'components/Select'

import getCC from 'utils/phoneNumbers/getCountryCodeFromNumber'
import getNSN from 'utils/phoneNumbers/getNsnFromNumber'

import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box'

import CloseIcon from '@material-ui/icons/Close'
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined'

import IVRStore from 'stores/IVR'

import useStyles from './styles'

const UpdateMainNumber = props => {
  const { t, open, handleClose } = props
  const classes = useStyles()
  const match = useParams()
  const {
    isUpdatingMainNumber,
    putUpdateMainNumber,
    mainNumber,
    getIVRNumbers,
    ivrNumbers,
    isLoadingIVRNumbers
  } = IVRStore
  const [number, setNumber] = useState('')

  useEffect(() => {
    setNumber(mainNumber.value ? mainNumber.value : '')
    getIVRNumbers(match.customerId, match.groupId, 1, 99999, 'id', 'asc')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleUpdate = () => {
    putUpdateMainNumber(
      match.customerId,
      match.groupId,
      match.ivrId,
      {
        cc_main_number: `+${getCC(number)}`,
        main_number: getNSN(number)
      },
      handleClose
    )
  }

  if (isLoadingIVRNumbers) {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        className={classes.rootUpdateMainNumber}
      >
        <Loading />
      </Dialog>
    )
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className={classes.rootUpdateMainNumber}
    >
      <DialogTitle className={classes.title}>
        {t('update_main_number')}
        <IconButton
          aria-label='close'
          onClick={handleClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        {isUpdatingMainNumber ? (
          <Loading />
        ) : (
          <Box className={classes.content}>
            <Select
              icon={<PhoneOutlinedIcon />}
              value={number}
              options={[
                {
                  value: mainNumber.value,
                  label: mainNumber.value,
                  show: !mainNumber.value
                },
                ...ivrNumbers.map(el => ({
                  value: `${el.country_code}${el.nsn}`,
                  label: `${el.country_code}${el.nsn}`
                }))
              ]}
              onChange={e => setNumber(e.target.value)}
            />
          </Box>
        )}
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button
          variant='outlined'
          color='primary'
          className={classes.cancelButton}
          onClick={handleClose}
          disabled={isUpdatingMainNumber}
        >
          {t('cancel')}
        </Button>
        <Button
          variant='contained'
          color='primary'
          className={classes.assignButton}
          disabled={isUpdatingMainNumber}
          onClick={handleUpdate}
        >
          {t('add')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withNamespaces()(observer(UpdateMainNumber))
