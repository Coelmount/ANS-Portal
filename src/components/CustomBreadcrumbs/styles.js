import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  breadcrumbsWrap: {
    paddingLeft: 62,
    paddingTop: 24,
    color: theme.palette.gray40
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
