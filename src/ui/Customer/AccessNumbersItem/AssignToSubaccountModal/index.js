import React from 'react'
import { observer } from 'mobx-react'

import Dialog from '@material-ui/core/Dialog'

import { makeStyles } from '@material-ui/core/styles'

import EntitlementsStore from 'stores/Entitlements'

import SetEntitlements from './SetEntitlements'
import TotalEntitlements from './TotalEntitlements'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiDialog-paperWidthSm': {
      width: '651px'
    },
    '& .MuiDialog-paperScrollPaper': {
      minHeight: '100%'
    }
  }
}))

const AssignToSubaccountModal = props => {
  const classes = useStyles()
  const {
    open,
    handleClose,
    successClose,
    isCreateSubaccount,
    store,
    createSubaccount,
    isEditCustomer
  } = props
  const { step } = EntitlementsStore

  return (
    <Dialog open={open} onClose={handleClose} className={classes.root}>
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
            // isLoadingData={isLoadingEntitlementTypes}
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
    </Dialog>
  )
}

export default observer(AssignToSubaccountModal)
