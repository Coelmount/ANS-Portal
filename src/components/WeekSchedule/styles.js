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
  popoverWrap: {
    width: 134,
    height: 86,
    cursor: 'pointer'
  },
  popoverButtonWrap: {
    display: 'flex',
    alignItems: 'center',
    height: 43,
    paddingLeft: 27,
    '&:first-child': {
      borderBottom: `1px solid ${theme.palette.active.main}`
    },
    '&:hover': {
      background: theme.palette.veryLightGrey
    }
  },
  popoverIcon: {
    marginRight: 10
  },
  popoverLabel: {
    fontSize: 14,
    fontFamily: 'MTN',
    color: theme.palette.black
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
