import React, { useState, useContext } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'

import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import CustomTable from 'components/CustomTable'

import sharp from 'source/images/svg/sharp.svg'
import PermIdentityOutlined from '@material-ui/icons/PermIdentityOutlined'
import ChevronLeft from '@material-ui/icons/ChevronLeft'

import Input from 'components/Input'
import Checkbox from 'components/Checkbox'

import PhoneNumbersStore from 'stores/PhoneNumbers'

import useStyles from './styles'
import RightArrowIcon from 'source/images/svg/right-arrow.svg'

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  )
}

const AddedListStep = ({ handleClose, t }) => {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  const {
    changeStep,
    addedPhoneNumbers,
    rejectedPhoneNumbers
  } = PhoneNumbersStore

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const columns = [
    {
      id: 'phoneNumber',
      label: 'number',
      getCellData: (row) => (
        <Typography
          className={classes.phoneNumberCellText}
        >{`${row.countryCode} ${row.phoneNumber}`}</Typography>
      ),
      isSortAvailable: false
    },
    {
      id: 'type',
      label: 'type',
      isSortAvailable: false
    },
    {
      id: 'addStatus',
      label: 'status',
      getCellData: (row) => (
        <Typography
          className={
            row.addStatus === 'added'
              ? classes.addedStatusText
              : classes.rejectedStatusText
          }
        >
          {row.addStatus}
        </Typography>
      ),
      isSortAvailable: false
    }
  ]

  return (
    <React.Fragment>
      <DialogTitle className={classes.title}>
        {t('added_phone_numbers_list')}
        <CloseIcon onClick={handleClose} className={classes.closeButton} />
      </DialogTitle>
      <DialogContent className={classes.addedListStepDialogContent}>
        <AppBar className={classes.appBar} position='static'>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label='simple tabs example'
            className={classes.tabsWrap}
          >
            <Tab
              className={value === 0 ? classes.activeTab : classes.nonActiveTab}
              label={`${t('added')} (${addedPhoneNumbers.length})`}
              {...a11yProps(0)}
            />
            <Tab
              className={value === 1 ? classes.activeTab : classes.nonActiveTab}
              label={`${t('rejected')} (${rejectedPhoneNumbers.length})`}
              {...a11yProps(1)}
            />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <CustomTable
            classes={classes}
            columns={columns}
            firstCell={false}
            showPagination={false}
            rows={addedPhoneNumbers}
            showSearchBar={false}
            firstCell={true}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CustomTable
            classes={classes}
            columns={columns}
            firstCell={false}
            showPagination={false}
            rows={rejectedPhoneNumbers}
            showSearchBar={false}
            firstCell={true}
          />
        </TabPanel>
      </DialogContent>
      <DialogActions className={classes.dialogActionsAddedList}>
        <Button
          variant='contained'
          color='primary'
          className={classes.okButtonAddedList}
          onClick={handleClose}
        >
          {'OK'}
        </Button>
      </DialogActions>
    </React.Fragment>
  )
}

export default withNamespaces()(observer(AddedListStep))
