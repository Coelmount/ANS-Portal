import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  breadcrumbsWrap: {
    paddingTop: 24,
    color: theme.palette.grey40
  },
  link: {
    color: theme.palette.secondary.main,
    textDecoration: 'none',
    '&:focus': {
      color: '#598597'
    }
  }
}))

export default useStyles
