import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  container: {
    paddingLeft: '124px !important',
    background: 'white',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '50px !important'
    },
    [theme.breakpoints.down(735)]: {
      paddingLeft: '34px !important'
    },
    [theme.breakpoints.between(600, 675)]: {
      paddingLeft: '24px !important'
    }
  }
}))

export default useStyles
