import { makeStyles } from '@material-ui/core/styles/'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    boxShadow: 'none'
  },
  calendarCustomStyles: {
    height: 731,
    margin: '0px 33px 33px 68px !important'
  }
}))

export default useStyles
