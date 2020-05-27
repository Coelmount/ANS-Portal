import { decorate, observable, action } from 'mobx'

import axios from 'utils/axios'

import SnackbarStore from './Snackbar'
import getErrorMessage from 'utils/getErrorMessage'

export class AnnouncementsStore {
  announcements = []
  isLoadingAnnouncements = true

  getAnnouncements = (tenantId, groupId) => {
    this.isLoadingAnnouncements = true
    axios
      .get(`/tenants/${tenantId}/groups/${groupId}/announcements/`)
      .then(res => {
        this.announcements = res.data.admins
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to fetch announcements',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => {
        this.isLoadingAnnouncements = false
      })
  }
}
decorate(AnnouncementsStore, {
  announcements: observable,
  isLoadingAnnouncements: observable,
  getAnnouncements: action
})

export default new AnnouncementsStore()
