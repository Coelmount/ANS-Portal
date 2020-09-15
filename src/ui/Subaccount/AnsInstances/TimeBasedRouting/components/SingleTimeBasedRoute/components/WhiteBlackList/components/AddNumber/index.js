import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { withNamespaces } from 'react-i18next'
import { useParams } from 'react-router-dom'
import PhoneInput from 'react-phone-input-2'

import Loading from 'components/Loading'

import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box'

import CloseIcon from '@material-ui/icons/Close'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Clear'

import WhiteBlackListStore from 'stores/TimeBasedRouting/WhiteBlackList'
import ModalHelperText from 'components/ModalHelperText'

import useStyles from '../../styles'

const AddIVR = props => {
  const { t, open, handleClose, mode } = props
  const classes = useStyles()
  const match = useParams()
  const { postAddNumberToCallBlocking, isAddingNumbers } = WhiteBlackListStore
  const [arrayOfInputs, setArrayOfInputs] = useState([''])

  const handleAddNumbers = () => {
    if (arrayOfInputs.length === 1 && !arrayOfInputs[0]) {
      handleClose()
      return
    }

    postAddNumberToCallBlocking(
      match.customerId,
      match.groupId,
      { mode: mode, numbers: arrayOfInputs.map(el => `+${el}`) },
      handleClose
    )
  }

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
        <ModalHelperText helperText='add_phone_number_to_tbr_wb_list' />
        {isAddingNumbers ? (
          <Loading />
        ) : (
          <Box className={classes.content}>
            {arrayOfInputs.map((el, index) => (
              <Box className={classes.rowBox} key={index}>
                <PhoneInput
                  className={classes.inputNumber}
                  value={el}
                  placeholder={t('phone_number')}
                  onChange={value => {
                    const newNumber = [...arrayOfInputs]
                    newNumber[index] = value
                    setArrayOfInputs(newNumber)
                  }}
                />
                <Box className={classes.addButtonBoxModal}>
                  {index + 1 === arrayOfInputs.length ? (
                    <React.Fragment>
                      <Button
                        variant={'contained'}
                        color={'primary'}
                        className={classes.roundButtonAddModal}
                        onClick={() => {
                          const newArray = [...arrayOfInputs]
                          newArray.push('')
                          setArrayOfInputs(newArray)
                        }}
                      >
                        <AddIcon />
                      </Button>
                    </React.Fragment>
                  ) : (
                    <Button
                      className={classes.roundButtonDelete}
                      onClick={() => {
                        const newNumbers = [...arrayOfInputs]
                        newNumbers.splice(index, 1)
                        setArrayOfInputs(newNumbers)
                      }}
                    >
                      <RemoveIcon />
                    </Button>
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button
          variant='outlined'
          color='primary'
          className={classes.cancelButton}
          onClick={handleClose}
          disabled={isAddingNumbers}
        >
          {t('cancel')}
        </Button>
        <Button
          variant='contained'
          color='primary'
          className={classes.assignButton}
          disabled={
            isAddingNumbers || arrayOfInputs.some(input => input.length < 7)
          }
          onClick={handleAddNumbers}
        >
          {t('add')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withNamespaces()(observer(AddIVR))
