import React, { Component } from 'react'
import { withSnackbar } from 'notistack'
import { observer } from 'mobx-react'
import { autorun } from 'mobx'
import SneckbarStore from 'stores/Snackbar'
import NotificationContent from './Snackbar'

class Notifier extends Component {
  displayed = []

  storeDisplayed = id => {
    this.displayed = [...this.displayed, id]
  }

  componentDidMount() {
    autorun(() => {
      const { notifications = [], removeSnackbar } = SneckbarStore

      notifications.forEach(notification => {
        // Do nothing if snackbar is already displayed
        if (this.displayed.includes(notification.key)) return
        // Display snackbar using notistack
        this.props.enqueueSnackbar(notification.message, {
          ...notification.options,
          //classes: props.classes,
          content: (key, message) => (
            <NotificationContent
              id={key}
              message={message}
              options={notification.options}
            />
          )
        })
        //this.props.enqueueSnackbar(notification.message, notification.options)
        // Keep track of snackbars that we've displayed
        this.storeDisplayed(notification.key)
        // Dispatch action to remove snackbar from mobx store
        removeSnackbar(notification.key)
      })
    })
  }

  render() {
    return null
  }
}

export default withSnackbar(observer(Notifier))
