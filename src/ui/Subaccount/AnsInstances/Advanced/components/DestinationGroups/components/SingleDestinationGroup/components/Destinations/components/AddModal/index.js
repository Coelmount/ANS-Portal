import React, { useState, useEffect } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Button from '@material-ui/core/Button'

import DestinationsStore from 'stores/DestinationGroups/Destinations'
import Loading from 'components/Loading'
import CustomTable from 'components/CustomTable'
import Checkbox from 'components/Checkbox'
import ModalHelperText from 'components/ModalHelperText'
import transformOnChange from 'utils/tableCheckbox/transformOnChange'
import transformOnCheckAll from 'utils/tableCheckbox/transformOnCheckAll'
import transformOnHover from 'utils/tableCheckbox/transformOnHover'

import useStyles from './styles'

const AddModal = ({ t, open, handleClose }) => {
  const classes = useStyles()
  const match = useParams()
  const { customerId, groupId } = match

  const {
    getAvailableDestinationsForPost,
    availableDestinationsForPost,
    isAvailableDestinationsLoading,
    isDestinationPosting,
    postDestinations
  } = DestinationsStore

  const [numbers, setNumbers] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  const [searchList, setSearchList] = useState([])

  const isLoading = isDestinationPosting || isAvailableDestinationsLoading
  const isAddButtonEnabled =
    numbers.some(number => number.checked) && !isLoading

  useEffect(() => {
    const payload = {
      customerId,
      groupId
    }
    getAvailableDestinationsForPost(payload)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setNumbers(availableDestinationsForPost)
  }, [availableDestinationsForPost])

  useEffect(() => {
    handleCheckedStates(searchList)
  }, [searchList])

  const selectNumbers = (checked, id) => {
    const newSelected = transformOnChange(numbers, checked, id)
    setNumbers(newSelected)
  }

  const handleSelectAll = () => {
    const newSelected = transformOnCheckAll(searchList, numbers, selectAll)
    handleCheckedStates(newSelected)
    setNumbers(newSelected)
    setSelectAll(!selectAll)
  }

  const handleCheckedStates = newSelected => {
    if (
      newSelected.every(el => {
        return el.checked
      })
    ) {
      setSelectAll(true)
    } else {
      setSelectAll(false)
    }
    if (!newSelected.length) {
      setSelectAll(false)
    }
  }

  const changeHover = (newHover, id) => {
    const newSelected = transformOnHover(numbers, newHover, id)
    setNumbers(newSelected)
  }

  const handleAdd = () => {
    const payload = {
      customerId,
      groupId,
      closeModal: handleClose,
      numbers
    }
    postDestinations(payload)
  }

  const columns = [
    {
      id: 'checkbox',
      label: (
        <Checkbox
          className={classes.headCheckbox}
          checked={selectAll}
          onChange={handleSelectAll}
        />
      ),
      isSortAvailable: false,
      getCellData: (row, i) =>
        row.checked ? (
          <Checkbox
            checked={row.checked}
            className={classes.checkbox}
            onChange={() => selectNumbers(!row.checked, row.id)}
          />
        ) : (
          <div
            className={classes.indexHoverCheckbox}
            onClick={() => selectNumbers(!row.checked, row.id)}
            onMouseLeave={() => changeHover(false, row.id)}
            onMouseEnter={() => changeHover(true, row.id)}
          >
            {row.hover ? (
              <Checkbox
                checked={row.checked}
                className={classes.checkbox}
                onChange={() => selectNumbers(true, row.id)}
              />
            ) : (
              i + 1
            )}
          </div>
        ),
      extraHeadProps: {
        className: classes.checkboxCell
      },
      extraProps: {
        className: classes.checkboxCell
      }
    },
    {
      id: 'name',
      label: 'destination',
      extraProps: {
        className: classes.entitlementHeadCell
      }
    },
    {
      id: 'phoneNumber',
      label: 'phone_number',
      extraProps: {
        className: classes.entitlementHeadCell
      }
    }
  ]

  return (
    <Dialog open={open} onClose={handleClose} className={classes.root}>
      <DialogTitle className={classes.title}>
        {t('add_destination')}
        <IconButton
          aria-label='close'
          onClick={handleClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent className={classes.entitlementsDialogContent}>
        <ModalHelperText title={t('add_destination')} />
        {isLoading ? (
          <Loading />
        ) : (
          <CustomTable
            classes={classes}
            columns={columns}
            firstCell={false}
            showPagination={true}
            rows={numbers}
            searchCriterias={['name', 'phoneNumber']}
            getSearchList={setSearchList}
            noAvailableDataMessage={t('no_destinations_available')}
            isModal={true}
            tableId={'advanced_destinations_add_modal'}
          />
        )}
      </DialogContent>

      <DialogActions className={classes.dialogActions}>
        <Button
          variant='outlined'
          color='primary'
          className={classes.backButton}
          onClick={handleClose}
        >
          {t('cancel')}
        </Button>
        <Button
          variant='contained'
          color='primary'
          className={classes.nextButton}
          disabled={!isAddButtonEnabled}
          onClick={handleAdd}
        >
          {t('add')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withNamespaces()(observer(AddModal))
