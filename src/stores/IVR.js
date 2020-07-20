import axios from 'utils/axios'
import { decorate, observable, action } from 'mobx'

import SnackbarStore from './Snackbar'
import getErrorMessage from 'utils/getErrorMessage'
import phoneNumbersRangeFilter from 'utils/phoneNumbers/rangeFilter'
import getCountryNameFromNumber from 'utils/phoneNumbers/getCountryNameFromNumber'
import getCountryTwoLetterCodeFromNumber from 'utils/phoneNumbers/getCountryTwoLetterCodeFromNumber'
import difference from 'lodash/difference'
import sortBy from 'lodash/sortBy'

class IVR {
  ivrs = []
  isLoadingIVRs = false
  singleLvl = false
  multiLvl = false
  isLoadingLicenses = false
  addIVR = false
  isUpdatingIVR = false
  isDeletingIVR = false
  ivr = {}
  isUpdatingIVR = false
  isLoadingAnnouncement = false
  announcement = ''
  isLoadingWhiteBlackList = false
  whiteBlackList = {}
  menu = {}
  submenus = []
  isLoadingSubmenus = false
  isAddingSubmenu = false
  isDeletingSubmenu = false
  isDeletingNumbers = false
  mainNumber = {}
  isLoadingMainNumber = {}
  isLoadingIVRNumbers = false
  ivrNumbers = []
  availableNumbers = []
  isAvailableNumbersLoading = true
  totalPages = 0
  countries = []
  freeSecondaryIDs = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
  isAddingSecondaryNumbers = false

  getIVRs = (tenantId, groupId) => {
    this.isLoadingIVRs = true
    this.ivrs = []
    axios
      .get(`/tenants/${tenantId}/groups/${groupId}/services/ivrs/`)
      .then(res => (this.ivrs = res.data.ivrs))
      .finally(() => (this.isLoadingIVRs = false))
  }

  getCheckLicensesIVR = (tenantId, groupId) => {
    this.isLoadingLicenses = true
    this.singleLvl = false
    this.multiLvl = false
    axios
      .get(`/tenants/${tenantId}/groups/${groupId}/licenses/`)
      .then(res => {
        const basicAttendant = res.data.groupServices.filter(
          el => el.name === 'Auto Attendant'
        )[0]
        const standardAttendant = res.data.groupServices.filter(
          el => el.name === 'Auto Attendant - Standard'
        )[0]
        if (basicAttendant) {
          if (
            basicAttendant.allocated.unlimited === true ||
            (basicAttendant.allocated.unlimited === false &&
              basicAttendant.allocated.maximum > basicAttendant.inUse)
          ) {
            this.singleLvl = true
          } else {
            this.singleLvl = false
          }
        } else {
          this.singleLvl = false
        }
        if (standardAttendant) {
          if (
            standardAttendant.allocated.unlimited === true ||
            (standardAttendant.allocated.unlimited === false &&
              standardAttendant.allocated.maximum > standardAttendant.inUse)
          ) {
            this.multiLvl = true
          } else {
            this.multiLvl = false
          }
        } else {
          this.multiLvl = false
        }
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to fetch ivrs',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => (this.isLoadingLicenses = false))
  }

  postAddIVR = (tenantId, groupId, data) => {
    this.addIVR = true
    return axios
      .post(`/tenants/${tenantId}/groups/${groupId}/services/ivrs/`, data)
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to create ivr',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => {
        this.addIVR = false
      })
  }

  putUpdateIVR = (tenantId, groupId, ivrId, data, callback) => {
    this.isUpdatingIVR = true
    axios
      .put(
        `/tenants/${tenantId}/groups/${groupId}/services/ivrs/${ivrId}/`,
        data
      )
      .then(res => {
        this.ivr = res.data.ivrInstance
        callback && callback()
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to update ivr',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => {
        this.isUpdatingIVR = false
      })
  }

  deleteIVR = (tenantId, groupId, ivrId, callback) => {
    this.isDeletingIVR = true
    axios
      .delete(`/tenants/${tenantId}/groups/${groupId}/services/ivrs/${ivrId}/`)
      .then(() => {
        callback && callback()
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to delete ivr',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => {
        this.isDeletingIVR = false
      })
  }

  getIVR = (tenantId, groupId, ivrId) => {
    this.isLoadingIVR = true
    this.ivr = {}
    axios
      .get(`/tenants/${tenantId}/groups/${groupId}/services/ivrs/${ivrId}/`)
      .then(res => {
        this.ivr = res.data.ivrInstance
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to fetch ivr',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => {
        this.isLoadingIVR = false
      })
  }

  putUpdateIVRMenu = (
    tenantId,
    groupId,
    ivrId,
    menuLvl,
    menuType,
    data,
    callback
  ) => {
    this.isUpdatingIVRMenu = true
    axios
      .put(
        `/tenants/${tenantId}/groups/${groupId}/services/ivrs/${ivrId}/${menuLvl}/${menuType}/`,
        data
      )
      .then(() => {
        callback && callback()
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to update ivr menu',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => {
        this.isUpdatingIVRMenu = false
      })
  }

  getGreetingAnnouncement = (tenantId, groupId, announcementName) => {
    this.isLoadingAnnouncement = true
    this.announcement = ''
    axios
      .get(
        `/tenants/${tenantId}/groups/${groupId}/announcements/content/${announcementName}/`
      )
      .then(res => {
        this.isLoadingAnnouncement = false
        this.announcement = `data:audio/mpeg;base64,${res.data.content}`
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
        this.isLoadingAnnouncement = false
      })
  }

  getWhiteBlackList = (tenantId, groupId, ivrId) => {
    this.isLoadingWhiteBlackList = true
    this.whiteBlackList = {}
    axios
      .get(
        `/tenants/${tenantId}/groups/${groupId}/services/ivrs/${ivrId}/call_blocking/`
      )
      .then(res => {
        this.isLoadingWhiteBlackList = false
        this.whiteBlackList = {
          ...res.data,
          allowed_numbers: res.data.allowed_numbers
            ? res.data.allowed_numbers.map(el => ({
                phoneNumber: el,
                checked: false,
                hover: false
              }))
            : [],
          blocked_numbers: res.data.blocked_numbers
            ? res.data.blocked_numbers.map(el => ({
                phoneNumber: el,
                checked: false,
                hover: false
              }))
            : []
        }
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to fetch white black list',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => {
        this.isLoadingWhiteBlackList = false
      })
  }

  getMenu = (tenantId, groupId, ivrId, menuLvl, typeMenu, route) => {
    if (route === 'main') {
      this.menu = {}
    }
    if (Object.keys(this.menu).some(el => el === route)) {
      if (this.menu[route].name === typeMenu) {
        return
      }
    }
    this.menu = { ...this.menu, [route]: { isLoading: true } }
    axios
      .get(
        `/tenants/${tenantId}/groups/${groupId}/services/ivrs/${ivrId}/${menuLvl}/${typeMenu}/`
      )
      .then(res => {
        const menuWithId = {
          ...res.data,
          keys: res.data.keys.map((el, i) => ({
            ...el,
            id: el.id ? el.id : i
          })),
          name: typeMenu,
          isLoading: false
        }
        this.menu = { ...this.menu, [route]: menuWithId }
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to fetch menu',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => {
        this.menu[route].isLoading = false
      })
  }

  getSubmenus = (tenantId, groupId, ivrId) => {
    this.isLoadingSubmenus = true
    this.submenus = []
    axios
      .get(
        `/tenants/${tenantId}/groups/${groupId}/services/ivrs/${ivrId}/submenus/`
      )
      .then(res => {
        this.isLoadingSubmenus = false
        this.submenus = res.data.submenus
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to fetch submenus',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => {
        this.isLoadingSubmenus = false
      })
  }

  postAddSubmenu = (tenantId, groupId, ivrId, data, callback) => {
    this.isAddingSubmenu = true
    axios
      .post(
        `/tenants/${tenantId}/groups/${groupId}/services/ivrs/${ivrId}/submenus/`,
        data
      )
      .then(() => {
        this.submenus.push(data)
        callback && callback()
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to create ivr',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => (this.isAddingSubmenu = false))
  }

  deleteSubmenu = (tenantId, groupId, ivrId, submenuId, callback) => {
    this.isDeletingSubmenu = true
    axios
      .delete(
        `/tenants/${tenantId}/groups/${groupId}/services/ivrs/${ivrId}/submenus/${submenuId}/`
      )
      .then(() => callback && callback())
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to delete submenu',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => (this.isDeletingSubmenu = false))
  }

  deleteNumberFromCallBlocking = (tenantId, groupId, ivrId, data, callback) => {
    this.isDeletingNumbers = true
    axios
      .delete(
        `/tenants/${tenantId}/groups/${groupId}/services/ivrs/${ivrId}/call_blocking`,
        data
      )
      .then(() => callback && callback())
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to delete number',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => (this.isDeletingNumbers = false))
  }

  postAddNumberToCallBlocking = (tenantId, groupId, ivrId, data, callback) => {
    this.isAddingNumbers = true
    axios
      .post(
        `/tenants/${tenantId}/groups/${groupId}/services/ivrs/${ivrId}/call_blocking/`,
        data
      )
      .then(() => {
        callback && callback()
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to add numbers',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => (this.isAddingNumbers = false))
  }

  getMainNumber = (tenantId, groupId, ivrId) => {
    this.isLoadingMainNumber = true
    this.mainNumber = {}
    axios
      .get(
        `/tenants/${tenantId}/groups/${groupId}/services/ivrs/${ivrId}/main_number/`
      )
      .then(res => {
        this.mainNumber = {
          value: res.data.mainNumber,
          country: getCountryNameFromNumber(res.data.mainNumber)
            ? getCountryNameFromNumber(res.data.mainNumber)
            : ''
        }
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to fetch main number',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => {
        this.isLoadingMainNumber = false
      })
  }

  getSecondaryNumber = (tenantId, groupId, ivrId) => {
    this.isLoadingSecondaryNumbers = true
    this.secondaryNumbers = []
    this.freeSecondaryIDs = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    axios
      .get(
        `/tenants/${tenantId}/groups/${groupId}/services/ivrs/${ivrId}/secondary_numbers/`
      )
      .then(res => {
        this.secondaryNumbers = res.data.secondaryNumbers.length
          ? res.data.secondaryNumbers.map(el => ({
              id: el.id,
              value: el.phoneNumber,
              country: getCountryNameFromNumber(el.phoneNumber)
            }))
          : []
        this.freeSecondaryIDs = [
          ...difference(
            this.freeSecondaryIDs,
            res.data.secondaryNumbers.map(el => el.id)
          )
        ]
        console.log(this.freeSecondaryIDs)
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to fetch secondary numbers',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => {
        this.isLoadingSecondaryNumbers = false
      })
  }

  getIVRNumbers = (
    tenantId,
    groupId,
    page,
    perPage,
    orderByField,
    orderField
  ) => {
    this.isLoadingIVRNumbers = true
    this.ivrNumbers = []
    axios
      .get(
        `/tenants/${tenantId}/groups/${groupId}/numbers?paging={"page_number":${page},"page_size":${perPage}}&cols=["country_code","nsn","type","connected_to","service_capabilities"]&sorting=[{"field": "${orderByField}", "direction": "${orderField}"}]&service_capabilities=ivr&in_use=false`
      )
      .then(res => {
        this.ivrNumbers = res.data.numbers
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to fetch ivr numbers',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => {
        this.isLoadingIVRNumbers = false
      })
  }

  putUpdateMainNumber = (tenantId, groupId, ivrId, data, callback) => {
    this.isUpdatingMainNumber = true
    axios
      .put(
        `/tenants/${tenantId}/groups/${groupId}/services/ivrs/${ivrId}/main_number/`,
        data
      )
      .then(() => {
        callback && callback()
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to update main number',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => {
        this.isUpdatingMainNumber = false
      })
  }

  getAvailableNumbers = ({
    customerId,
    groupId,
    page,
    rowsPerPage,
    orderBy,
    order,
    countryCode
  }) => {
    this.availableNumbers = []
    this.isAvailableNumbersLoading = true

    let orderByField
    switch (orderBy) {
      case 'phoneNumber': {
        orderByField = 'nsn'
        break
      }
      case 'type': {
        orderByField = 'type'
        break
      }
      default: {
        orderByField = 'id'
      }
    }
    const orderField = order || 'asc'
    const countryCodeField = countryCode.length
      ? countryCode.replace('+', '%2B')
      : ''

    axios
      .get(
        `/tenants/${customerId}/groups/${groupId}/numbers?paging={"page_number":${page},"page_size":${rowsPerPage}}&cols=["country_code","nsn","type","connected_to","service_capabilities"]&sorting=[{"field": "${orderByField}", "direction": "${orderField}"}]&service_capabilities=ivr&in_use=false&&country_code=${countryCodeField}`
      )
      .then(res => {
        const pagination = res.data.pagination
        const requestResult = res.data.numbers

        const transformedNumbers = requestResult
          .filter(el => !el.connected_to)
          .map(item => {
            return {
              ...item,
              phoneNumber: `${item.country_code} ${item.nsn}`,
              checked: false,
              hover: false
            }
          })

        this.availableNumbers = transformedNumbers
        this.totalPages = pagination[2]

        const countryCodes = requestResult.map(item => item.country_code)
        const uniqueCountryCodes = [...new Set(countryCodes)]
        this.countries = uniqueCountryCodes.map(countryCode => {
          return {
            phone: countryCode,
            code: getCountryTwoLetterCodeFromNumber(`${countryCode}11111`),
            label: getCountryNameFromNumber(`${countryCode}11111`)
          }
        })
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message:
            getErrorMessage(e) || 'Failed to fetch available to add numbers',
          options: {
            variant: 'error'
          }
        })
      })
      .finally(() => {
        this.isAvailableNumbersLoading = false
      })
  }

  putAddSecondaryNumbers = (tenantId, groupId, ivrId, data, callback) => {
    this.isAddingSecondaryNumbers = true
    axios
      .put(
        `/tenants/${tenantId}/groups/${groupId}/services/ivrs/${ivrId}/secondary_numbers/`,
        { secondary_numbers: data }
      )
      .then(() => {
        callback && callback()
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to add secondary number',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => {
        this.isAddingSecondaryNumbers = false
      })
  }

  clearLoadingStates = () => {
    this.isAvailableNumbersLoading = true
  }
}

decorate(IVR, {
  ivrs: observable,
  isLoadingIVRs: observable,
  isLoadingLicenses: observable,
  singleLvl: observable,
  multiLvl: observable,
  addIVR: observable,
  isUpdatingIVR: observable,
  isDeletingIVR: observable,
  ivr: observable,
  isLoadingIVR: observable,
  announcement: observable,
  isLoadingAnnouncement: observable,
  isLoadingWhiteBlackList: observable,
  whiteBlackList: observable,
  isLoadingMenu: observable,
  menu: observable,
  isLoadingSubmenus: observable,
  submenus: observable,
  isAddingSubmenu: observable,
  isDeletingSubmenu: observable,
  isDeletingNumbers: observable,
  isAddingNumbers: observable,
  mainNumber: observable,
  isLoadingMainNumber: observable,
  isLoadingSecondaryNumbers: observable,
  secondaryNumbers: observable,
  isLoadingIVRNumbers: observable,
  ivrNumbers: observable,
  isUpdatingMainNumber: observable,
  availableNumbers: observable,
  isAvailableNumbersLoading: observable,
  freeSecondaryIDs: observable,
  isAddingSecondaryNumbers: observable,
  getIVRs: action,
  getCheckLicensesIVR: action,
  postAddIVR: action,
  putUpdateIVR: action,
  deleteIVR: action,
  getIVR: action,
  putUpdateIVRMenu: action,
  getGreetingAnnouncement: action,
  getWhiteBlackList: action,
  getMenu: action,
  getSubmenus: action,
  postAddSubmenu: action,
  deleteSubmenu: action,
  deleteNumberFromCallBlocking: action,
  postAddNumberToCallBlocking: action,
  getMainNumber: action,
  getSecondaryNumber: action,
  getIVRNumbers: action,
  putUpdateMainNumber: action,
  getAvailableNumbers: action,
  putAddSecondaryNumbers: action,
  clearLoadingStates: action
})

export default new IVR()
