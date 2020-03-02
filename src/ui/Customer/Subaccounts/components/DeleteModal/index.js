import React, { Fragment } from 'react'
import { withNamespaces } from 'react-i18next'

import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Dialog from '@material-ui/core/Dialog'

import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'
import deleteIcon from 'source/images/svg/delete-icon.svg'

import Loading from 'components/Loading'

const DeleteModal = props => {
  const {
    classes,
    open,
    handleClose,
    handleDelete,
    subaccountToDelete,
    isDeletingSubaccount,
    t
  } = props
  const { name, id } = subaccountToDelete

  return (
    <Dialog
      className={classes.deleteModal}
      disableAutoFocus={true}
      open={open}
      onClose={handleClose}
    >
      {isDeletingSubaccount ? (
        <Loading />
      ) : (
        <Fragment>
          <Box className={classes.deleteHeader}>
            <Box className={classes.deleteTitleBlock}>
              <img src={deleteIcon} alt='delete icon' />
              <Typography className={classes.deleteTitle}>
                {`${t('delete')} ${t('subaccount')}`}
              </Typography>
            </Box>
            <CloseOutlinedIcon
              onClick={handleClose}
              className={classes.closeIcon}
            />
          </Box>
          <Box className={classes.deleteMain}>
            <Typography className={classes.deleteMainText}>
              {t(`are_you_sure_you_want`)}
              <span className={classes.boldText}> {t('to_delete')}</span>
              {` ${t(`subaccount`)}:`}
              <span className={classes.boldText}>{` ${name} (id: ${id})`}</span>
              ?
            </Typography>
            <Box className={classes.deleteButtonsBlock}>
              <Box onClick={handleClose} className={classes.cancelButtonWrap}>
                <Typography className={classes.buttonTitle}>
                  {t('cancel')}
                </Typography>
              </Box>
              <Box
                onClick={() => handleDelete(id)}
                className={classes.deleteButtonWrap}
              >
                <Typography className={classes.buttonTitle}>
                  {t('delete')}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Fragment>
      )}
    </Dialog>
  )
}

export default withNamespaces()(DeleteModal)
