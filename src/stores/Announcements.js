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
        this.announcements = res.data.announcements.map(el => ({
          ...el,
          isLodaing: false
        }))
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

  getAnnouncementContent = (tenantId, groupId, announcementName) => {
    axios
      .get(
        `/tenants/${tenantId}/groups/${groupId}/announcements/content/${announcementName}/`
      )
      .then(res => {
        const newAnnouncements = [...this.announcements]
        const index = this.announcements.findIndex(
          el => el.name === announcementName
        )
        newAnnouncements[index].announcement = res.data
        newAnnouncements[index].isLodaing = false
        this.announcements = newAnnouncements
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to fetch announcement',
          options: {
            variant: 'error'
          }
        })
      )
  }
}
decorate(AnnouncementsStore, {
  announcements: observable,
  isLoadingAnnouncements: observable,
  getAnnouncements: action,
  getAnnouncementContent: action
})

export default new AnnouncementsStore()
