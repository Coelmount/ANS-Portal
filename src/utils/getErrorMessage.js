import has from 'lodash/has'

const getErrorMessage = error => {
  if (has(error, 'response.status') && error.response.status === 401) {
    if (has(error, 'response.data.error')) {
      return error.response.data.error
    }
    return 'Your current session has expired. Please login again to continue.'
  }
  if (
    has(error, 'response.data.apio.body.errors[0].details.errors[0].summary') //10
  ) {
    return error.response.data.apio.body.errors[0].details.errors[0].summary
  }
  if (has(error, 'response.data.errors[0].details.errors[0].summary')) {
    //8
    return error.response.data.errors[0].details.errors[0].summary
  }
  if (
    has(error, 'response.data.apio.body.errors[0].message') //7
  ) {
    return error.response.data.apio.body.errors[0].message
  }
  if (has(error, 'response.data.nims.body.error')) {
    //5
    return error.response.data.nims.body.error
  }
  if (has(error, 'response.data.errors[0].message')) {
    //5
    return error.response.data.errors[0].message
  }
  if (has(error, 'response.data.message')) {
    //3
    return error.response.data.message
  }
  if (has(error, 'response.data.error')) {
    //3
    return error.response.data.error
  }
}

export default getErrorMessage
