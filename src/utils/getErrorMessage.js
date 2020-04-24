import has from 'lodash/has'

const getErrorMessage = error => {
  if (has(error, 'response.data.errors[0].details.errors[0].summary')) {
    return error.response.data.errors[0].details.errors[0].summary
  }
  if (has(error, 'response.data.error')) {
    return error.response.data.error
  }
  if (error.response.status === 401) {
    return 'Your current session has expired. Please login again to continue.'
  }
}

export default getErrorMessage
