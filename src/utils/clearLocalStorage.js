const clearLocalStorage = () => {
  localStorage.removeItem('isAuthorized')
  localStorage.removeItem('jwtToken')
  localStorage.removeItem('refreshJwtToken')
  localStorage.removeItem('rowsPerPageScheme')
}

export default clearLocalStorage
