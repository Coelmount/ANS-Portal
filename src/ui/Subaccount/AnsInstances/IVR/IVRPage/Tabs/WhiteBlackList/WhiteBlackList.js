import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { withNamespaces } from 'react-i18next'
import { useParams, useHistory, useLocation } from 'react-router-dom'
import { toJS } from 'mobx'
import has from 'lodash/has'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'

import MenuTemplate from 'components/MenuTemplate'
import Loading from 'components/Loading'
import CustomTable from 'components/CustomTable'
import Checkbox from 'components/Checkbox'

import blacklist from 'source/images/svg/blacklist.svg'
import whitelist from 'source/images/svg/whitelist.svg'
import RemoveIcon from '@material-ui/icons/Clear'
import deleteIcon from 'source/images/svg/delete-icon.svg'

import IVRStore from 'stores/IVR'
import useStyles from './styles'

const WhiteBlackList = props => {
  const { t } = props
  const {
    ivr,
    isLoadingIVR,
    getWhiteBlackList,
    isLoadingWhiteBlackList,
    whiteBlackList
  } = IVRStore
  const classes = useStyles()
  const match = useParams()
  const [mode, setMode] = useState('')
  const [selectAll, setSelectAll] = useState(false)
  const [numbers, setNumbers] = useState([])

  useEffect(() => {
    if (!isLoadingWhiteBlackList) {
      getWhiteBlackList(match.customerId, match.groupId, match.ivrId)
    }
  }, [])

  useEffect(() => {
    if (has(whiteBlackList, 'allowed_numbers.length')) {
      setNumbers(whiteBlackList.allowed_numbers)
    }
  }, [whiteBlackList.allowed_numbers])

  useEffect(() => {
    if (whiteBlackList.mode) {
      setMode(whiteBlackList.mode)
    }
  }, [whiteBlackList.mode])

  if (isLoadingIVR || isLoadingWhiteBlackList) {
    return <Loading />
  }

  const changeMode = e => {
    if (whiteBlackList.mode === 'inactive') {
      setMode(e.target.value)
    }
  }

  const handleSelectAll = () => {
    const newNumbers = numbers.map(el => ({
      ...el,
      checked: !selectAll,
      hover: false
    }))
    setNumbers(newNumbers)
    setSelectAll(!selectAll)
  }

  const selectNumbers = (checked, number) => {
    const newNumbers = [...numbers]
    const index = numbers.findIndex(el => el.phoneNumber === number)
    newNumbers[index].checked = checked
    if (newNumbers.every(el => el.checked)) {
      setSelectAll(true)
    } else {
      setSelectAll(false)
    }
    setNumbers(newNumbers)
  }

  const changeHover = (newHover, number) => {
    const newNumbers = [...numbers]
    const index = numbers.findIndex(el => el.phoneNumber === number)
    newNumbers[index].hover = newHover
    setNumbers(newNumbers)
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
            onChange={() => selectNumbers(!row.checked, row.phoneNumber)}
          />
        ) : (
          <div
            className={classes.indexHoverCheckbox}
            onClick={() => selectNumbers(!row.checked, row.phoneNumber)}
            onMouseLeave={() => changeHover(false, row.phoneNumber)}
            onMouseEnter={() => changeHover(true, row.phoneNumber)}
          >
            {row.hover ? (
              <Checkbox
                checked={row.checked}
                className={classes.checkbox}
                onChange={() => selectNumbers(true, row.phoneNumber)}
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
    //   getCellData: (row, i) =>
    //     row.checked ? (
    //       <Checkbox
    //         checked={row.checked}
    //         className={classes.checkbox}
    //         onChange={() => selectNumbers(!row.checked, row.rangeFrom)}
    //       />
    //     ) : (
    //       <div
    //         className={classes.indexHoverCheckbox}
    //         onClick={() => selectNumbers(!row.checked, row.rangeFrom)}
    //         onMouseLeave={() => changeHover(false, row.rangeFrom)}
    //         onMouseEnter={() => changeHover(true, row.rangeFrom)}
    //       >
    //         {row.hover ? (
    //           <Checkbox
    //             checked={row.checked}
    //             className={classes.checkbox}
    //             onChange={() => selectNumbers(true, row.rangeFrom)}
    //           />
    //         ) : (
    //           i + 1
    //         )}
    //       </div>
    //     ),
    //   extraHeadProps: {
    //     className: classes.checkboxCell
    //   },
    //   extraProps: {
    //     className: classes.checkboxCell
    //   }
    // },
    {
      id: 'phone',
      label: t('phone_number'),
      getCellData: row => row.phoneNumber
    },
    {
      id: 'delete',
      label: (
        <Button
          variant='contained'
          color='primary'
          className={classes.deleteSelectedButton}
          onClick={() => {
            console.log(213123)
          }}
        >
          <img
            src={deleteIcon}
            alt='deleteIcon'
            className={classes.deleteIcon}
          />
        </Button>
      ),
      isSortAvailable: false,
      getCellData: row => (
        <Button
          className={classes.roundButtonDelete}
          onClick={() => {
            console.log(row.phoneNumber)
          }}
        >
          <RemoveIcon />
        </Button>
      )
    }
  ]

  return (
    <React.Fragment>
      <Box className={classes.mainBox}>
        <FormControl component='fieldset' className={classes.formControl}>
          <RadioGroup
            value={mode}
            onChange={changeMode}
            className={classes.radioGroup}
          >
            <FormControlLabel
              value='blacklist'
              control={
                <Radio
                  checkedIcon={<span className={classes.checkedRadioIcon} />}
                  icon={<span className={classes.radioIcon} />}
                />
              }
              label={
                <Box className={classes.formControlLabel}>
                  <img
                    src={blacklist}
                    alt='blacklist'
                    className={classes.icons}
                  />
                  <Box>{t('blacklist')}</Box>
                </Box>
              }
              disabled={whiteBlackList.mode === 'whitelist'}
            />
            <FormControlLabel
              value='whitelist'
              control={
                <Radio
                  checkedIcon={<span className={classes.checkedRadioIcon} />}
                  icon={<span className={classes.radioIcon} />}
                />
              }
              label={
                <Box className={classes.formControlLabel}>
                  <img
                    src={whitelist}
                    alt='whitelist'
                    className={classes.icons}
                  />
                  <Box>{t('whitelist')}</Box>
                </Box>
              }
              disabled={whiteBlackList.mode === 'blacklist'}
            />
          </RadioGroup>
        </FormControl>
        <Box className={classes.tableBox}>
          <CustomTable
            columns={columns}
            firstCell={false}
            showPagination={false}
            showSearchBar={false}
            showToolBar={false}
            noAvailableDataMessage={t('no_phone_numbers_available')}
            rows={numbers}
          />
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default withNamespaces()(observer(WhiteBlackList))
