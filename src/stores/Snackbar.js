import { decorate, observable, action } from 'mobx'

export class SnackbarStore {
  notifications = []

  enqueueSnackbar = note => {
    this.notifications.push({
      key: new Date().getTime() + Math.random(),
      message: note.message,
      options: {
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        },
        ...note.options
      }
    })
  }

  removeSnackbar = note => {
    this.notifications.remove(note)
  }
}

decorate(SnackbarStore, {
  notifications: observable,
  enqueueSnackbar: action,
  removeSnackbar: action
})

export default new SnackbarStore()
