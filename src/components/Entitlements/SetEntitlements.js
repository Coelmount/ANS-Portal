import React, { useState, useEffect, Fragment } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'
import { useParams } from 'react-router-dom'

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
import Loading from 'components/Loading'
import transformOnChange from 'utils/tableCheckbox/transformOnChange'
import transformOnCheckAll from 'utils/tableCheckbox/transformOnCheckAll'
import transformOnHover from 'utils/tableCheckbox/transformOnHover'

import useStyles from './styles'

const SetEntitlements = props => {
  const { handleClose, t } = props
  const {
    changeStep,
    getEntitlementTypes,
    entitlementTypes,
    isLoadingEntitlementTypes,
    updateCheckedArr,
    setDefaultEntitlementTypes
  } = EntitlementsStore

  const classes = useStyles()
  const match = useParams()
  const [selected, setSelected] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  const [searchList, setSearchList] = useState([])

  useEffect(() => {
    handleCheckedStates(searchList)
  }, [searchList])

  useEffect(() => {
    const isFilterNeeded = Boolean(match.customerId)
    getEntitlementTypes(isFilterNeeded)
    return () => setDefaultEntitlementTypes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getEntitlementTypes, setDefaultEntitlementTypes])

  useEffect(() => {
    setSelected(entitlementTypes)
  }, [entitlementTypes])

  const selectEntitlementTypes = (checked, id) => {
    const newSelected = transformOnChange(selected, checked, id)
    setSelected(newSelected)
  }

  const handleSelectAll = () => {
    const newSelected = transformOnCheckAll(searchList, selected, selectAll)
    handleCheckedStates(newSelected)
    setSelected(newSelected)
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
    const newSelected = transformOnHover(selected, newHover, id)
    setSelected(newSelected)
  }

  const handleNextButtonClick = () => {
    updateCheckedArr(selected.filter(item => item.checked === true))
    changeStep(2)
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
      label: 'entitlement',
      extraProps: {
        className: classes.entitlementHeadCell
      }
    }
  ]

  return (
    <Fragment>
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
        {isLoadingEntitlementTypes ? (
          <Loading />
        ) : (
          <CustomTable
            classes={classes}
            columns={columns}
            firstCell={false}
            showPagination={true}
            rows={selected}
            searchCriterias={['name']}
            getSearchList={setSearchList}
            noAvailableDataMessage={t('no_entitlements_available')}
            isModal={true}
            tableId={'set_entitlements'}
          />
        )}
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
          disabled={!selected.some(item => item.checked === true)}
        >
          {t('next')}
        </Button>
      </DialogActions>
    </Fragment>
  )
}

export default withNamespaces()(observer(SetEntitlements))
