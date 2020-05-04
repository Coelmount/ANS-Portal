import React, { useState, useEffect } from 'react'
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

import NumbersStore from 'stores/Numbers'

import useStyles from './styles'
import RightArrowIcon from 'source/images/svg/right-arrow.svg'

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

function TabPanel(props) {
  const { children, value, index, classes, ...other } = props

  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className={classes.tabPanel}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  )
}

const AddedListStep = ({ handleClose, t }) => {
  const classes = useStyles()
  const [value, setValue] = useState(0)

  const { addedNumbers, rejectedNumbers } = NumbersStore

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const columns = [
    {
      id: 'phoneNumber',
      label: 'number',
      getCellData: row => (
        <Typography className={classes.phoneNumberCellText}>
          {row.phoneNumber}
        </Typography>
      ),
      isSortAvailable: false,
      extraProps: { className: classes.textCenter }
    },
    {
      id: 'addStatus',
      label: 'status',
      getCellData: row => (
        <Typography
          className={
            row.status === 'added'
              ? classes.addedStatusText
              : classes.rejectedStatusText
          }
        >
          {row.status}
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
              label={`${t('added')} (${addedNumbers.length})`}
              disabled={addedNumbers.length <= 0}
              {...a11yProps(0)}
            />
            <Tab
              className={value === 1 ? classes.activeTab : classes.nonActiveTab}
              label={`${t('rejected')} (${rejectedNumbers.length})`}
              disabled={rejectedNumbers.length <= 0}
              {...a11yProps(1)}
            />
          </Tabs>
        </AppBar>
        <TabPanel classes={classes} value={value} index={0}>
          <CustomTable
            classes={classes}
            columns={columns}
            firstCell={false}
            showPagination={false}
            rows={addedNumbers}
            showSearchBar={false}
            firstCell={true}
            showToolBar={false}
          />
        </TabPanel>
        <TabPanel classes={classes} value={value} index={1}>
          <CustomTable
            classes={classes}
            columns={columns}
            firstCell={false}
            showPagination={false}
            rows={rejectedNumbers}
            showSearchBar={false}
            firstCell={true}
            showToolBar={false}
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
