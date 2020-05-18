import { makeStyles } from '@material-ui/core/styles'

const useAdditionalStyles = makeStyles({
  prevPaginationIcon: ({ page }) => ({
    color: page === 1 ? '#C4C4C4' : '#00678F'
  }),
  nextPaginationIcon: ({ page, totalPages }) => ({
    color: page > totalPages || page === totalPages ? '#C4C4C4' : '#00678F'
  })
})

export default useAdditionalStyles
