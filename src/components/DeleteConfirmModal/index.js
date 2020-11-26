import React, { useState } from 'react'
import { withNamespaces } from 'react-i18next'
import classnames from 'classnames'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import Typography from '@material-ui/core/Typography'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'

import Loading from 'components/Loading'
import Input from 'components/Input'

import deleteIcon from 'source/images/svg/delete-icon.svg'
import useStyles from './styles'

const DeleteConfirmModal = ({
  t,
  leftButtonText,
  rightButtonText,

  open,
  handleClose,
  handleDelete,
  isLoading,
  title,
  deleteSubject,
  deleteObject
}) => {
  const classes = useStyles()

  const [inputValue, setInputValue] = useState('')

  const isDeletePossible = inputValue === 'DELETE' && !isLoading

  const handleInputChange = e => {
    setInputValue(e.target.value)
  }

  const handleDeleteClick = () => {
    if (isDeletePossible) handleDelete()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      disableAutoFocus={true}
      className={classes.root}
    >
      <>
        <DialogTitle>
          <div className={classes.titleContainer}>
            <div>
              <img
                className={classes.deleteIcon}
                src={deleteIcon}
                alt='delete icon'
              />
              <span className={classes.title}>{t(title)}</span>
            </div>

            <CloseOutlinedIcon
              onClick={handleClose}
              className={classes.closeIcon}
            />
          </div>
        </DialogTitle>

        <DialogContent>
          <div className={classes.mainContainer}>
            <div className={classes.contentContainer}>
              {isLoading ? (
                <Loading />
              ) : (
                <>
                  <div className={classes.textContainer}>
                    <span>{t('are_you_sure_delete')}</span>
                    <div>
                      <span
                        className={classes.firstdeleteText}
                      >{`${deleteSubject} -  ${deleteObject}? `}</span>
                    </div>
                    <span>{t('you_cant_undo')}</span>
                  </div>

                  <div className={classes.confirmContainer}>
                    <span>{t('please_type')}</span>
                    <span className={classes.secondConfirmText}>DELETE</span>
                    <Input
                      onChange={handleInputChange}
                      className={classes.deleteInput}
                      InputLabelProps={{ shrink: false }}
                    />
                  </div>
                </>
              )}
            </div>

            <div className={classes.actionButtonsContainer}>
              <div
                onClick={handleClose}
                className={classnames(
                  classes.actionButton,
                  classes.cancelButton
                )}
              >
                <Typography className={classes.buttonTitle}>
                  {t(leftButtonText)}
                </Typography>
              </div>

              <div
                onClick={handleDeleteClick}
                className={classnames(
                  classes.actionButton,
                  classes.deleteButton,
                  { [classes.disabledDeleteButton]: !isDeletePossible }
                )}
              >
                <Typography className={classes.actionButtonTitle}>
                  {t(rightButtonText)}
                </Typography>
              </div>
            </div>
          </div>
        </DialogContent>
      </>
    </Dialog>
  )
}

DeleteConfirmModal.defaultProps = {
  leftButtonText: 'cancel',
  rightButtonText: 'delete'
}

export default withNamespaces()(DeleteConfirmModal)
