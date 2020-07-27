import React from 'react'
import { useSnackbar } from 'notistack'
import CloseIcon from '@material-ui/icons/Close'
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import { withStyles } from '@material-ui/core'
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined'

import Button from '@material-ui/core/Button'

import styles from './styles'

const icons = {
  success: CheckCircleOutlineOutlinedIcon,
  error: ErrorOutlineIcon,
  warning: ReportProblemOutlinedIcon,
  info: InfoOutlinedIcon
}

const NotificationContent = React.forwardRef(
  ({ id, message, options, classes }, ref) => {
    const Icon = options.variant ? icons[options.variant] : <div />

    const { closeSnackbar } = useSnackbar()

    const handleDismiss = () => {
      closeSnackbar(id)
    }

    return (
      options.variant && (
        <div
          className={`${classes.notificationMainWrapper} ${options.variant}`}
          ref={ref}
        >
          <div className={classes.notificationsWrapper}>
            <div className={classes.messageWrapper}>
              {Icon ? <Icon className={classes.variantIcon} /> : null}
              <span className={classes.messageTitle}>{message}</span>
            </div>
            <Button onClick={handleDismiss} className={classes.roundButton}>
              <CloseIcon className={classes.closeIcon} />
            </Button>
          </div>
        </div>
      )
    )
  }
)

export default withStyles(styles)(NotificationContent)
