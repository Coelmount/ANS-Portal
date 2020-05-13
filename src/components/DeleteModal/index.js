import React, { Fragment } from 'react'
import { withNamespaces } from 'react-i18next'
import PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Dialog from '@material-ui/core/Dialog'

import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'
import deleteIcon from 'source/images/svg/delete-icon.svg'

import Loading from 'components/Loading'
import useStyles from './styles'

const DeleteModal = props => {
  const classes = useStyles()
  const {
    open,
    handleClose,
    handleDelete,
    deleteInfo,
    isDeleting,
    deleteSubject,
    extraDeleteSubject,
    action,
    titleAction,
    extraMessageBlock,
    t
  } = props
  const { name, id } = deleteInfo

  return (
    <Dialog
      className={classes.deleteModal}
      disableAutoFocus={true}
      open={open}
      onClose={handleClose}
    >
      {isDeleting ? (
        <Loading />
      ) : (
        <Fragment>
          <Box className={classes.deleteHeader}>
            <Box className={classes.deleteTitleBlock}>
              <img
                className={classes.deleteIcon}
                src={deleteIcon}
                alt='delete icon'
              />
              <Typography className={classes.deleteTitle}>
                {`${titleAction} ${deleteSubject}`}
              </Typography>
            </Box>
            <CloseOutlinedIcon
              onClick={handleClose}
              className={classes.closeIcon}
            />
          </Box>
          <Box className={classes.deleteMain}>
            <Box className={classes.deleteMainText}>
              <span>{t(`are_you_sure_you_want`)}</span>
              <span className={classes.boldText}> {action}</span>
              <span>{` ${extraDeleteSubject || deleteSubject}`}</span>
              {id && (
                <span className={classes.boldText}>
                  {` ${name}${` id: ${id}`}?`}
                </span>
              )}
              {extraMessageBlock}
            </Box>
            <Box className={classes.deleteButtonsBlock}>
              <Box onClick={handleClose} className={classes.cancelButtonWrap}>
                <Typography className={classes.buttonTitle}>
                  {t('cancel')}
                </Typography>
              </Box>
              <Box
                onClick={() => handleDelete && handleDelete(id)}
                className={classes.deleteButtonWrap}
              >
                <Typography className={classes.buttonTitle}>
                  {titleAction || t('delete')}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Fragment>
      )}
    </Dialog>
  )
}

DeleteModal.propTypes = {
  deleteInfo: PropTypes.object
}

DeleteModal.defaultProps = {
  deleteInfo: {
    name: '',
    id: null
  }
}

export default withNamespaces()(DeleteModal)
