import { decorate, observable, action } from 'mobx'

import axios from 'utils/axios'

import SnackbarStore from './Snackbar'
import getErrorMessage from 'utils/getErrorMessage'

export class AnnouncementsStore {
  announcements = []
  defaultAnnouncements = []
  isLoadingAnnouncements = false
  isLoadingDefaultAnnouncements = false
  isDeleting = false

  getAnnouncements = (tenantId, groupId) => {
    this.isLoadingAnnouncements = true
    axios
      .get(`/tenants/${tenantId}/groups/${groupId}/announcements/`)
      .then(res => {
        this.announcements = res.data.announcements.map(el => ({
          ...el,
          isLoading: false
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
    const newAnnouncements = [...this.announcements]
    const index = this.announcements.findIndex(
      el => el.name === announcementName
    )
    newAnnouncements[index].isLoading = true
    this.announcements = newAnnouncements
    axios
      .get(
        `/tenants/${tenantId}/groups/${groupId}/announcements/content/${announcementName}/`
      )
      .then(res => {
        const newAnnouncements = [...this.announcements]
        const index = this.announcements.findIndex(
          el => el.name === announcementName
        )
        newAnnouncements[
          index
        ].url = `data:audio/mpeg;base64,${res.data.content}`
        newAnnouncements[index].isLoading = false
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
      .finally(() => {
        const newAnnouncements = [...this.announcements]
        const index = this.announcements.findIndex(
          el => el.name === announcementName
        )
        newAnnouncements[index].isLoading = false
        this.announcements = newAnnouncements
      })
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

  getDefaultAnnouncements = () => {
    this.isLoadingDefaultAnnouncements = true
    axios
      .get(`/configs/default_announcements/`)
      .then(res => {
        this.defaultAnnouncements = res.data.announcements
          .filter(ann => ann.level === 'All' || ann.level === 'Group')
          .map(el => ({
            ...el,
            isLodaing: false
          }))
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message:
            getErrorMessage(e) || 'Failed to fetch default announcements',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => {
        this.isLoadingDefaultAnnouncements = false
      })
  }

  getDefaultAnnouncementContent = announcementName => {
    const newAnnouncements = [...this.defaultAnnouncements]
    const index = this.defaultAnnouncements.findIndex(
      el => el.name === announcementName
    )
    newAnnouncements[index].isLoading = true
    this.defaultAnnouncements = newAnnouncements
    axios
      .get(`/configs/default_announcements/content/${announcementName}/`)
      .then(res => {
        const newAnnouncements = [...this.defaultAnnouncements]
        const index = this.defaultAnnouncements.findIndex(
          el => el.name === announcementName
        )
        newAnnouncements[
          index
        ].url = `data:audio/mpeg;base64,${res.data.content}`
        newAnnouncements[index].isLoading = false
        this.defaultAnnouncements = newAnnouncements
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to fetch announcement',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => {
        const newAnnouncements = [...this.defaultAnnouncements]
        const index = this.defaultAnnouncements.findIndex(
          el => el.name === announcementName
        )
        newAnnouncements[index].isLoading = false
        this.defaultAnnouncements = newAnnouncements
      })
  }
}
decorate(AnnouncementsStore, {
  announcements: observable,
  defaultAnnouncements: observable,
  isLoadingAnnouncements: observable,
  isLoadingDefaultAnnouncements: observable,
  isDeleting: observable,
  getAnnouncements: action,
  getAnnouncementContent: action,
  postAddAnnouncements: action,
  deleteAnnouncement: action,
  getDefaultAnnouncements: action,
  getDefaultAnnouncementContent: action
})

export default new AnnouncementsStore()
