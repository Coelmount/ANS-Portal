import { decorate, observable, action } from 'mobx'
import merge from 'lodash/merge'

import axios from 'utils/axios'
import set from 'lodash/set'
import SnackbarStore from './Snackbar'
import getErrorMessage from 'utils/getErrorMessage'

const defaultCustomerValue = {
  id: '',
  tenantId: '',
  name: '',
  defaultDomain: '',
  contactInformation: {
    name: '',
    phoneNumber: '',
    emailAddress: ''
  },
  useTenantLanguage: '',
  addressInformation: {
    addressLine1: '',
    postalCode: '',
    city: '',
    country: ''
  }
}

export class CustomersStore {
  rows = []
  step = 1
  customer = defaultCustomerValue
  customerName = ''
  isLoadingCustomers = true
  isLoadingCustomer = false
  isLoadingStatus = true
  isDeletingCustomer = false
  addUpdateCustomer = false
  isUpdatingStatus = false
  isLoadingCustomerName = true

  getCustomers = () => {
    this.isLoadingCustomers = true
    this.rows = []
    axios
      .get(`/tenants`)
      .then(res => {
        this.rows = res.data.tenants
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to fetch customers',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => {
        this.isLoadingCustomers = false
      })
  }

  getCustomer = id => {
    this.isLoadingCustomer = true
    this.customer = defaultCustomerValue
    axios
      .get(`/tenants/${id}/`)
      .then(res => {
        merge(this.customer, res.data)
        this.getCustomerStatus(res.data.tenantId)
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to fetch customer',
          options: {
            variant: 'error'
          }
        })
      })
  }

  getCustomerName = id => {
    this.isLoadingCustomerName = true
    this.customerName = ''
    axios
      .get(`/tenants/${id}/`)
      .then(res => {
        this.customerName = res.data.name
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to fetch customer',
          options: {
            variant: 'error'
          }
        })
      })
      .finally(() => (this.isLoadingCustomerName = false))
  }

  getCustomersStatus = tenants => {
    const promisArr = []
    tenants.forEach(tenant => {
      promisArr.push(
        axios.get(`/tenants/${tenant.tenantId}/properties/suspension/`)
      )
    })

    Promise.all(promisArr)
      .then(res => {
        res.forEach((response, i) => {
          const newRows = [...this.rows]
          newRows[i].status =
            response.data.suspensionStatus === ''
              ? 'Active'
              : response.data.suspensionStatus
          this.rows = [...newRows]
        })
      })
      .finally(() => {
        this.isLoadingCustomers = false
      })
  }

  getCustomerStatus = tenantId => {
    this.isLoadingStatus = true
    axios
      .get(`/tenants/${tenantId}/properties/suspension/`)
      .then(
        res =>
          (this.customer = {
            ...this.customer,
            status:
              res.data.suspensionStatus === ''
                ? 'Active'
                : res.data.suspensionStatus
          })
      )
      .finally(() => {
        this.isLoadingStatus = false
        this.isLoadingCustomer = false
      })
  }

  getCustomerDefaultValues = () => {
    this.customer = defaultCustomerValue
  }

  setDefaultTableValues = () => {
    this.rows = []
    this.step = 1
    this.customer = defaultCustomerValue
    this.isLoadingCustomers = true
    this.isLoadingCustomer = false
    this.isDeletingCustomer = false
    this.addUpdateCustomer = false
  }

  deleteCustomer = ({ id, callback }) => {
    this.isDeletingCustomer = true
    axios
      .delete(`/tenants/${id}`)
      .then(() => {
        this.getCustomers()
        callback()
        this.isDeletingCustomer = false
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to delete customer',
          options: {
            variant: 'error'
          }
        })
        if (e.response && e.response.status === 400) {
          this.isDeletingCustomer = false
        }
      })
      .finally(() => {
        this.isDeletingCustomer = false
      })
  }

  updateCustomer = (tenantId, handleClose) => {
    this.addUpdateCustomer = true
    return axios
      .put(`/tenants/${tenantId}`, this.customer)
      .then(res => {
        merge(this.customer, res.data)
        handleClose()
        SnackbarStore.enqueueSnackbar({
          message: 'Customer updated successfully',
          options: {
            variant: 'success'
          }
        })
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to update customer',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => {
        this.addUpdateCustomer = false
      })
  }

  putUpdateCustomerStatus = (teantaId, data, callback) => {
    this.isUpdatingStatus = true
    axios
      .put(`/tenants/${teantaId}/properties/suspension/`, data)
      .then(() => {
        callback && callback()
        SnackbarStore.enqueueSnackbar({
          message: 'Customer status updated successfully',
          options: {
            variant: 'success'
          }
        })
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to update customer status',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => {
        this.isUpdatingStatus = false
      })
  }

  changeStep = step => {
    this.step = step
  }

  changeCustomer = (variable, value) => {
    set(this.customer, variable, value)
  }
}

decorate(CustomersStore, {
  step: observable,
  rows: observable,
  customer: observable,
  isLoadingCustomers: observable,
  isLoadingCustomer: observable,
  isLoadingStatus: observable,
  isDeletingCustomer: observable,
  isUpdatingStatus: observable,
  isLoadingCustomerName: observable,
  customerName: observable,
  getCustomers: action,
  getCustomer: action,
  deleteCustomer: action,
  addCustomer: action,
  changeStep: action,
  changeCustomer: action,
  getCustomerDefaultValues: action,
  setDefaultTableValues: action,
  getCustomersStatus: action,
  putUpdateCustomerStatus: action,
  getCustomerStatus: action,
  getCustomerName: action
})

export default new CustomersStore()
