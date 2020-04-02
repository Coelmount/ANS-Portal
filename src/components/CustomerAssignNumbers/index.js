import React, { useState, useEffect } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'
import { useParams } from 'react-router-dom'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import Input from 'components/Input'
import Select from 'components/Select'
import CustomTable from 'components/CustomTable'
import Loading from 'components/Loading'
import Checkbox from 'components/Checkbox'

import Group3Person from 'source/images/svg/Group3Person.svg'

import SubaccountsStore from 'stores/Subaccounts'

import capitalize from 'lodash/capitalize'

import useStyles from './styles'

const NUMBERS = [
  {
    id: 1,
    number: '+27 540300011',
    type: 'local',
    country: 'South Africa',
    checked: false
  },
  {
    id: 2,
    number: '+27 540300012',
    type: 'local',
    country: 'South Africa',
    checked: true
  },
  {
    id: 3,
    number: '+27 540300013',
    type: 'local',
    country: 'South Africa',
    checked: false
  },
  {
    id: 4,
    number: '+27 540300014',
    type: 'local',
    country: 'South Africa',
    checked: false
  },
  {
    id: 5,
    number: '+27 540300015',
    type: 'local',
    country: 'South Africa',
    checked: false
  },
  {
    id: 6,
    number: '+27 540300016',
    type: 'local',
    country: 'South Africa',
    checked: false
  }
]

const AssignNumbers = props => {
  const { t } = props
  const [numbers, setNumbers] = useState(NUMBERS)
  const [selectedGroup, setSelectedGroup] = useState('')
  const classes = useStyles()
  const match = useParams()
  const {
    getSubaccounts,
    selectGroups,
    isLoadingSubaccounts
  } = SubaccountsStore

  useEffect(() => {
    getSubaccounts(match.customerId)
  }, [match.customerId])

  const columns = [
    {
      id: 'checkbox',
      label: <Checkbox />,
      isSortAvailable: false,
      getCellData: row => <Checkbox checked={row.checked} />,
      extraHeadProps: {
        className: classes.totalHeader
      }
    },
    {
      id: 'number',
      label: 'number',
      isSortAvailable: false,
      getCellData: row => <Typography>{row.number}</Typography>
    },
    {
      id: 'type',
      label: 'type',
      isSortAvailable: false,
      getCellData: row => <Typography>{row.type}</Typography>,
      extraHeadProps: {
        className: classes.totalHeader
      }
    },
    {
      id: 'country',
      label: 'country',
      isSortAvailable: false,
      getCellData: row => <Typography>{row.country}</Typography>
    }
    // {
    //   id: 'assigned',
    //   label: 'assigned',
    //   getCellData: row => <Typography>{row.assigned}</Typography>,
    //   isSortAvailable: false,
    //   extraProps: {
    //     className: classes.textCenter
    //   },
    //   extraHeadProps: {
    //     className: classes.totalHeader
    //   }
    // },
    // {
    //   id: 'total',
    //   label: 'total',
    //   extraHeadProps: {
    //     className: classes.totalHeader
    //   },
    //   getCellData: row => (
    //     <Box>
    //       <Input
    //         type='number'
    //         inputProps={{ min: '0' }}
    //         defaultValue={row.total}
    //         className={classes.totalInput}
    //         variant='outlined'
    //       />
    //     </Box>
    //   ),
    //   isSortAvailable: false
    // }
  ]

  if (isLoadingSubaccounts) {
    return (
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        className={classes.modalDialog}
      >
        <Loading />
      </Dialog>
    )
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      className={classes.modalDialog}
    >
      <DialogTitle className={classes.title}>
        {t('assign_numbers_subaccounts')}
        <IconButton
          aria-label='close'
          onClick={props.handleClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.entitlementsDialogContent}>
        <Box className={classes.paragraphBox}>
          <div>{t('select_subaccount')}</div>
          <Box>
            <Select
              label={capitalize(t('subaccount'))}
              icon={<img src={Group3Person} alt='Group3Person' />}
              selectStyles={classes.select}
              wrapperStyles={classes.wrapper}
              options={selectGroups}
              value={selectedGroup}
              onChange={e => setSelectedGroup(e.target.value)}
            />
          </Box>
        </Box>
        <Box className={classes.secondParagraphBox}>
          {t('select_access_ph_num')}
        </Box>
        <CustomTable
          classes={classes}
          columns={columns}
          firstCell={false}
          rows={numbers}
        />
        {/* <CustomTable
          showSearchBar={false}
          isFullVersion={false}
          classes={classes}
          columns={columns}
          rows={entitlements}
        /> */}
      </DialogContent>
      <DialogActions className={classes.dialogActionsSecond}>
        <Button
          variant='outlined'
          color='primary'
          className={classes.backButton}
          onClick={props.handleClose}
        >
          {t('cancel')}
        </Button>
        <Button
          variant='contained'
          color='primary'
          className={classes.nextButton}
          onClick={props.handleClose}
        >
          {t('save')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withNamespaces()(observer(AssignNumbers))
