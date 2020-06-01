import { decorate, observable, action } from 'mobx'

import axios from 'utils/axios'

import SnackbarStore from './Snackbar'
import getErrorMessage from 'utils/getErrorMessage'

export class AnnouncementsStore {
  announcements = []
  isLoadingAnnouncements = true
  isDeleting = false

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

  postAddAnnouncements = (tenantId, groupId, data) => {
    return axios
      .post(`/tenants/${tenantId}/groups/${groupId}/announcements/`, data)
      .then(res =>
        SnackbarStore.enqueueSnackbar({
          message: `Announcement ${res.data.description} is added`,
          options: {
            variant: 'success'
          }
        })
      )
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to add announcement',
          options: {
            variant: 'error'
          }
        })
      )
  }

  deleteAnnouncement = (tenantId, groupId, name) => {
    this.isDeleting = true
    return axios
      .delete(`/tenants/${tenantId}/groups/${groupId}/announcements/`, {
        data: { announcements: [{ name: name }] }
      })
      .then(res =>
        SnackbarStore.enqueueSnackbar({
          message: `Announcement ${name} deleted`,
          options: {
            variant: 'success'
          }
        })
      )
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to delete announcement',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => (this.isDeleting = false))
  }
}
decorate(AnnouncementsStore, {
  announcements: observable,
  isLoadingAnnouncements: observable,
  isDeleting: observable,
  getAnnouncements: action,
  getAnnouncementContent: action,
  deleteAnnouncement: action
})

export default new AnnouncementsStore()
