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
  colorsLegendWrap: {
    width: '80%',
    display: 'flex',
    flexWrap: 'wrap'
  },
  colorsLegendItem: {
    display: 'flex',
    alignItems: 'center',
    width: '25%',
    height: 50
  },
  colorBox: {
    width: 26,
    height: 26
  },
  colorsLegendItemLabel: {
    marginLeft: 20,
    fontSize: 14
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
    '& .rbc-day-slot': {
      '& .rbc-event': {
        '&:hover': {
          opacity: '0.5 !important'
        }
      }
    },
    '& .rbc-event-label': {
      fontSize: 13
    },
    '& .rbc-time-content': {
      '& .rbc-day-slot': {
        '&:hover': {
          cursor: 'pointer'
        }
      }
    }
  }
}))

export default useStyles
