import has from 'lodash/has'

const getErrorMessage = error => {
  if (has(error, 'response.status') && error.response.status === 401) {
    return 'Your current session has expired. Please login again to continue.'
  }
  if (has(error, 'response.data.errors[0].details.errors[0].summary')) {
    return error.response.data.errors[0].details.errors[0].summary
  }
  if (has(error, 'response.data.message')) {
    return error.response.data.message
  }
  if (has(error, 'response.data.error')) {
    return error.response.data.error
  }
}

export default getErrorMessage
