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
  main: {
    background: theme.palette.active.main,
    paddingTop: 24
  },
  calendarCustomStyles: {
    margin: '0px 33px 33px 68px !important',
    '& .rbc-allday-cell': {
      display: 'none'
    },
    '& .rbc-header': {
      borderBottom: 'none',
      paddingTop: 10,
      paddingBottom: 10,
      fontSize: 14
    },
    '& .rbc-event-label': {
      fontSize: 13
    }
  }
}))

export default useStyles
