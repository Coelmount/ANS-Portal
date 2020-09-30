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
    height: 731,
    margin: '0px 33px 33px 68px !important',
    padding: '0px 27px 27px 27px',
    background: 'white',
    '& .rbc-event': {
      background: theme.palette.mattePink,
      '&:hover': {
        opacity: 0.8
      }
    },
    '& .rbc-date-cell': {
      textAlign: 'center'
    },
    '& .rbc-off-range-bg': {
      background: 'white'
    },
    '& .rbc-header': {
      borderBottom: 'none',
      fontWeight: 'normal',
      '& > span': {
        fontSize: 16,
        color: theme.palette.grey99
      }
    },
    '& .rbc-month-row': {
      '&:hover': {
        cursor: 'pointer'
      }
    }
  },
  helperTextWrap: {
    marginBottom: 8
  }
}))

export default useStyles
