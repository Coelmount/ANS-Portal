import React, { useContext, useState } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'

import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import CustomTable from 'components/CustomTable'
import EntitlementsStore from 'stores/Entitlements'
import Checkbox from 'components/Checkbox'

import useStyles from './styles'
import { useEffect } from 'react'

const SetEntitlements = (props) => {
  const { handleClose, t } = props
  const {
    changeStep,
    getEntitlementTypes,
    entitlementTypes,
    isLoadingEntitlementTypes,
    updateCheckedArr
  } = EntitlementsStore

  const classes = useStyles()
  const [selected, setSelected] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  const [isAnyChecked, setIsAnyChecked] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState('')
  const [searchList, setSearchList] = useState([])

  useEffect(() => {
    handleCheckedStates(searchList)
  }, [searchList])

  useEffect(() => {
    getEntitlementTypes()
  }, [])

  useEffect(() => {
    setSelected(entitlementTypes)
  }, [entitlementTypes])

  const selectEntitlementTypes = (checked, id) => {
    const newSelected = [...selected]
    const index = selected.findIndex((el) => el.id === id)
    newSelected[index].checked = checked
    if (newSelected.every((el) => el.checked)) {
      setSelectAll(true)
    } else {
      setSelectAll(false)
    }
    setSelected(newSelected)
  }

  const handleSelectAll = () => {
    const searchListId = searchList.map((item) => item.id)
    const newSelected = selected.map((el) => {
      let result = {}
      if (searchListId.includes(el.id)) {
        result = {
          ...el,
          checked: !selectAll,
          hover: false
        }
      } else {
        result = { ...el }
      }
      return result
    })
    handleCheckedStates(newSelected)
    setSelected(newSelected)
    setSelectAll(!selectAll)
    setIsAnyChecked(!selectAll)
  }

  const handleCheckedStates = (newSelected) => {
    if (
      newSelected.every((el) => {
        return el.checked
      })
    ) {
      setSelectAll(true)
      setIsAnyChecked(true)
    } else {
      setSelectAll(false)
      if (newSelected.some((el) => el.checked)) {
        setIsAnyChecked(true)
      } else {
        setIsAnyChecked(false)
      }
    }
    if (!newSelected.length) {
      setSelectAll(false)
      setIsAnyChecked(false)
    }
  }

  const changeHover = (newHover, id) => {
    const newSelected = [...selected]
    const index = selected.findIndex((el) => el.id === id)
    newSelected[index].hover = newHover
    setSelected(newSelected)
  }

  const handleNextButtonClick = () => {
    console.log(selected, 'selected in set')
    updateCheckedArr(selected.filter((item) => item.checked === true))
    changeStep(2)
  }

  const columns = [
    {
      id: 'checkbox',
      label: <Checkbox checked={selectAll} onChange={handleSelectAll} />,
      isSortAvailable: false,
      getCellData: (row, i) =>
        row.checked ? (
          <Checkbox
            checked={row.checked}
            className={classes.checkbox}
            onChange={() => selectEntitlementTypes(!row.checked, row.id)}
          />
        ) : (
          <div
            className={classes.indexHoverCheckbox}
            onClick={() => selectEntitlementTypes(!row.checked, row.id)}
            onMouseLeave={() => changeHover(false, row.id)}
            onMouseEnter={() => changeHover(true, row.id)}
          >
            {row.hover ? (
              <Checkbox
                checked={row.checked}
                className={classes.checkbox}
                onChange={() => selectEntitlementTypes(true, row.id)}
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
      label: 'entitlement'
    }
  ]

  return (
    <React.Fragment>
      <DialogTitle className={classes.title}>
        {t('add_entitlements')}
        <IconButton
          aria-label='close'
          onClick={handleClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.entitlementsDialogContent}>
        <Box className={classes.subtitle}>
          <Typography className={classes.stepStyles}>{`${t(
            'step'
          )} 1/2`}</Typography>
          <Typography className={classes.setEntitlementsTitle}>
            {t('select_entitlement')}
          </Typography>
        </Box>
        <CustomTable
          classes={classes}
          columns={columns}
          firstCell={false}
          showPagination={false}
          rows={selected}
          searchCriterias={['name']}
          getSearchList={setSearchList}
          isLoadingData={isLoadingEntitlementTypes}
        />
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
        <Button
          variant='contained'
          color='primary'
          className={classes.nextButton}
          onClick={handleNextButtonClick}
          disabled={!selected.some((item) => item.checked === true)}
        >
          {t('next')}
        </Button>
      </DialogActions>
    </React.Fragment>
  )
}

export default withNamespaces()(observer(SetEntitlements))
