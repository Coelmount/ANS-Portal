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

import BasicTranslationsStore from 'stores/BasicTranslations'
import CustomTable from 'components/CustomTable'
import Checkbox from 'components/Checkbox'

import useStyles from './styles'

const PHONE_NUMBERS = [
  {
    id: 1,
    country: 'South Africa',
    phoneNumber: '+27 53423437',
    type: 'local',
    checked: false,
    hover: false
  },
  {
    id: 2,
    country: 'Ghana',
    phoneNumber: '+31 53423467',
    type: 'local',
    checked: false,
    hover: false
  },
  {
    id: 3,
    country: 'South Africa',
    phoneNumber: '+27 53424437',
    type: 'geo',
    checked: false,
    hover: false
  },
  {
    id: 4,
    country: 'South Africa',
    phoneNumber: '+27 53423467',
    type: 'local',
    checked: false,
    hover: false
  },
  {
    id: 5,
    country: 'South Africa',
    phoneNumber: '+27 53423438',
    type: 'local',
    checked: false,
    hover: false
  },
  {
    id: 6,
    country: 'South Africa',
    phoneNumber: '+27 53423431',
    type: 'local',
    checked: false,
    hover: false
  }
]

const SelectAccessPhoneNumber = ({ handleClose, t }) => {
  const classes = useStyles()

  const { step, changeStep, updateSelectedPhoneNumber } = BasicTranslationsStore

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
          checked: checked
        }
        setSelectedNumber(result)
      } else {
        result = {
          ...item,
          checked: false
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
    updateSelectedPhoneNumber(selectedNumber)
    changeStep(2)
  }

  const columns = [
    {
      id: 'checkbox',
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
      }
    },
    {
      id: 'phoneNumber',
      label: 'number'
    },
    {
      id: 'type',
      label: 'type'
    },
    {
      id: 'country',
      label: 'country'
    }
  ]

  return (
    <Fragment>
      <DialogTitle className={classes.title}>
        {t('add_ans_basic_instance')}
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
            {t('select_access_phone_number')}
          </Typography>
        </Box>
        <CustomTable
          classes={classes}
          columns={columns}
          firstCell={false}
          showPagination={true}
          rows={selectedList}
          searchCriterias={['phoneNumber', 'type', 'country']}
          getSearchList={setSearchList}
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
          disabled={!selectedList.some((item) => item.checked === true)}
        >
          {t('next')}
        </Button>
      </DialogActions>
    </Fragment>
  )
}

export default withNamespaces()(observer(SelectAccessPhoneNumber))
