import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { withNamespaces } from 'react-i18next'
import { useParams } from 'react-router-dom'
import PhoneInput from 'react-phone-input-2'

import Input from 'components/Input'

import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box'

import CloseIcon from '@material-ui/icons/Close'
import AddIcon from '@material-ui/icons/Add'

import IVRStore from 'stores/IVR'
import CustomersStore from 'stores/Customers'
import ConfigStore from 'stores/Config'

import useStyles from './styles'
import { isNullLiteral } from '@babel/types'

const AddIVR = props => {
  const { t, open, handleClose, mode } = props
  const classes = useStyles()
  const match = useParams()
  const {} = IVRStore
  const [arrayOfInputs, setArrayOfInputs] = useState([''])

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className={classes.rootAddNumbers}
    >
      <DialogTitle className={classes.title}>
        {`${t('add_phone_number_to')} ${mode}`}
        <IconButton
          aria-label='close'
          onClick={handleClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        {arrayOfInputs.map((el, i) => (
          <Box className={classes.addButtonBox}>
            <PhoneInput
              //   country={selectedCountryNameCode}
              value={el}
              placeholder={t('phone_number')}
              //   disabled={!selectedCountryNameCode}
              //   onChange={(value, data) =>
              //     handlePhoneInputChange(value, data)
              //   }
              //   countryCodeEditable={isCountryCodeEditable}
              //   disableDropdown
            />
            {i + 1 === arrayOfInputs.length ? (
              <Box className={classes.addButtonBox}>
                <Button
                  variant={'contained'}
                  color={'primary'}
                  className={classes.roundButton}
                  onClick={() => {
                    const newArray = [...arrayOfInputs]
                    newArray.push('')
                    setArrayOfInputs(newArray)
                  }}
                >
                  <AddIcon />
                </Button>
                <Box>{`(${t('max')} 10)`}</Box>
              </Box>
            ) : null}
          </Box>
        ))}
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button
          variant='outlined'
          color='primary'
          className={classes.cancelButton}
          onClick={handleClose}
        >
          {t('cancel')}
        </Button>
        <Button
          variant='contained'
          color='primary'
          className={classes.assignButton}
        >
          {t('add')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withNamespaces()(observer(AddIVR))
