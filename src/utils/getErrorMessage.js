import has from 'lodash/has'

const getErrorMessage = error => {
  if (has(error, 'response.data.errors[0].details.errors[0].summary')) {
    return error.response.data.errors[0].details.errors[0].summary
  }
  if (has(error, 'response.data.error')) {
    return error.response.data.error
  }
}

export default getErrorMessage
