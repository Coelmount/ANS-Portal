import React, { useState } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'
import { useParams } from 'react-router-dom'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'

import Input from 'components/Input'
import CustomTable from 'components/CustomTable'
import ModalHelperText from 'components/ModalHelperText'
import Loading from 'components/Loading'

import DestinationsStore from 'stores/DestinationGroups/Destinations'

import useStyles from './styles'

const EditWeightsModal = ({ open, handleClose, t }) => {
  const classes = useStyles()
  const { customerId, groupId, destinationGroupName } = useParams()
  const {
    destinations,
    isDestinationsWeightUpdating,
    putDestinationsWeight
  } = DestinationsStore

  const [stateDestinations, setStateDestinations] = useState(() =>
    toJS(destinations)
  )

  const getCurrentSum = () => {
    let sum = 0
    stateDestinations.forEach(
      stateDestination => (sum += stateDestination.weight)
    )
    return sum
  }
  const currentSum = getCurrentSum()
  const isSaveAvailable = currentSum === 100

  const changeTotal = (newTotal, id) => {
    const newDestinations = [...stateDestinations]
    const index = stateDestinations.findIndex(el => el.id === id)
    newDestinations[index].weight = Number(newTotal)
    setStateDestinations(newDestinations)
  }

  const handleSave = () => {
    putDestinationsWeight({
      customerId,
      groupId,
      destinationGroupName,
      stateDestinations,
      callback: handleClose
    })
  }

  const columns = [
    {
      id: 'name',
      label: 'name',
      isSortAvailable: false
    },
    {
      id: 'phoneNumber',
      label: 'phoneNumber',
      isSortAvailable: false,
      extraProps: {
        className: classes.phoneNumberColumn
      },
      extraHeadProps: {
        className: classes.totalHeader
      }
    },
    {
      id: 'weight',
      label: 'weight',
      extraHeadProps: {
        className: classes.totalHeader
      },
      extraProps: {
        className: classes.totalCell
      },
      getCellData: row => (
        <Box>
          <Input
            type='number'
            inputProps={{ min: '0' }}
            value={row.weight}
            className={classes.totalInput}
            onChange={e => changeTotal(e.target.value, row.id)}
            variant='outlined'
          />
        </Box>
      ),
      isSortAvailable: false
    }
  ]

  return (
    <Dialog open={open} onClose={handleClose} className={classes.modalDialog}>
      {isDestinationsWeightUpdating ? (
        <Loading />
      ) : (
        <>
          <DialogTitle className={classes.title}>
            {t('edit_weights')}
            <IconButton
              aria-label='close'
              onClick={handleClose}
              className={classes.closeButton}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent className={classes.entitlementsDialogContent}>
            <ModalHelperText title='edit_weights' />
            <CustomTable
              showSearchBar={false}
              classes={classes}
              columns={columns}
              rows={stateDestinations}
              tableId={'edit_weights'}
            />
            <div className={classes.sumContainer}>
              <Typography>{t('weights_sum')}:</Typography>
              <Typography className={classes.sumNumberTitle}>
                {currentSum}
              </Typography>
            </div>
          </DialogContent>
          <DialogActions className={classes.dialogActionsSecond}>
            <Button
              variant='outlined'
              color='primary'
              className={classes.backButton}
              onClick={handleClose}
            >
              {t('cancel')}
            </Button>
            <Tooltip title={isSaveAvailable ? '' : t('weights_save_tooltip')}>
              <div>
                <Button
                  variant='contained'
                  color='primary'
                  className={classes.nextButton}
                  onClick={handleSave}
                  disabled={!isSaveAvailable}
                >
                  {t('save')}
                </Button>
              </div>
            </Tooltip>
          </DialogActions>
        </>
      )}
    </Dialog>
  )
}

export default withNamespaces()(observer(EditWeightsModal))
