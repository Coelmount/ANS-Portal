import React, { useState, useEffect, Fragment } from 'react'

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
import Dialog from '@material-ui/core/Dialog'

import BasicTranslationsStore from 'stores/BasicTranslations'
import CustomTable from 'components/CustomTable'
import Checkbox from 'components/Checkbox'

import useStyles from './styles'

const PHONE_NUMBERS = [
  {
    id: 1,
    accessCountry: 'South Africa',
    accessNumber: '+2753423437',
    type: 'local',
    enabled: false,
    checked: false,
    hover: false
  },
  {
    id: 2,
    accessCountry: 'Ghana',
    accessNumber: '+3153423421',
    type: 'local',
    enabled: true,
    checked: false,
    hover: false
  },
  {
    id: 3,
    accessCountry: 'South Africa',
    accessNumber: '+2753423437',
    type: 'local',
    enabled: true,
    checked: false,
    hover: false
  },
  {
    id: 4,
    accessCountry: 'South Africa',
    accessNumber: '+2753423467',
    type: 'local',
    enabled: false,
    checked: false,
    hover: false
  },
  {
    id: 5,
    accessCountry: 'South Africa',
    accessNumber: '+2753423312',
    type: 'local',
    enabled: true,
    checked: false,
    hover: false
  },
  {
    id: 6,
    accessCountry: 'South Africa',
    accessNumber: '+2753423432',
    type: 'local',
    enabled: false,
    checked: false,
    hover: false
  }
]

const EditAccessNumber = ({ open, handleClose, defaultInboundCountry, t }) => {
  const classes = useStyles()
  const { step, changeStep, updateSelectedInstance } = BasicTranslationsStore

  const [selectedList, setSelectedList] = useState(PHONE_NUMBERS)
  const [selectedNumber, setSelectedNumber] = useState(null)
  const [isAnyChecked, setIsAnyChecked] = useState(false)
  const [searchList, setSearchList] = useState([])

  const selectInstance = (checked, id) => {
    const newSelected = selectedList.map((item) => {
      let result = {}
      if (item.id === id) {
        result = {
          ...item,
          checked: checked,
          hover: false
        }
        setSelectedNumber(result)
      } else {
        result = {
          ...item,
          checked: false,
          hover: false
        }
      }
      return result
    })
    setSelectedList(newSelected)
  }

  const changeHover = (newHover, id) => {
    const newSelected = [...selectedList]
    const index = selectedList.findIndex((el) => el.id === id)
    newSelected[index].hover = newHover
    setSelectedList(newSelected)
  }

  const handleNextButtonClick = () => {
    updateSelectedInstance(selectedNumber)
    handleClose()
  }

  const columns = [
    {
      id: 'checkbox',
      label: <Checkbox checked={false} />,
      isSortAvailable: false,
      getCellData: (row, i) =>
        row.checked ? (
          <Checkbox
            checked={row.checked}
            className={classes.checkbox}
            onChange={() => selectInstance(!row.checked, row.id)}
          />
        ) : (
          <div
            className={classes.indexHoverCheckbox}
            onClick={() => selectInstance(!row.checked, row.id)}
            onMouseLeave={() => changeHover(false, row.id)}
            onMouseEnter={() => changeHover(true, row.id)}
          >
            {row.hover ? (
              <Checkbox
                checked={row.checked}
                className={classes.checkbox}
                onChange={() => selectInstance(true, row.id)}
              />
            ) : (
              i + 1
            )}
          </div>
        ),
      extraProps: {
        className: classes.checkboxCell
      },
      extraHeadProps: {
        className: classes.checkboxCell
      }
    },
    {
      id: 'accessNumber',
      label: 'number'
    },
    {
      id: 'type',
      label: 'type'
    },
    {
      id: 'accessCountry',
      label: 'accessCountry'
    }
  ]

  return (
    <Dialog open={open} onClose={handleClose} className={classes.root}>
      <DialogTitle className={classes.title}>
        {t('edit_ans_basic_instance')}
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
          <Typography className={classes.setEntitlementsTitle}>
            {t('select_new_inbound_number')}
          </Typography>
        </Box>
        <CustomTable
          classes={classes}
          columns={columns}
          firstCell={false}
          showPagination={true}
          rows={selectedList}
          searchCriterias={['accessNumber', 'type', 'accessCountry']}
          getSearchList={setSearchList}
          initialSearchQuery={defaultInboundCountry}
          // isLoadingData={isLoadingEntitlementTypes}
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
          disabled={!selectedNumber}
        >
          {t('save')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withNamespaces()(observer(EditAccessNumber))
