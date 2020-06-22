import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  mainWrap: {
    width: 564,
    marginTop: 27,
    borderRadius: 3,
    border: `1px solid ${theme.palette.silver}`,
    '&.Mui-focused fieldset': {
      borderColor: 'white'
    }
  },
  header: {
    height: 50,
    display: 'flex',
    justifyContent: 'space-between',
    paddingRight: 31,
    paddingLeft: 31,
    marginBottom: 36,
    background: 'white',
    boxShadow: '0px 4px 8px rgba(204, 204, 204, 0.25)'
  },
  deleteIcon: {
    cursor: 'pointer'
  },
  daysBlockWrap: {
    display: 'flex',
    padding: '22px 38px 22px 22px',
    alignItems: 'center'
  },
  daysBlockRowWrap: {
    display: 'flex',
    borderBottom: `1px solid ${theme.palette.silver}`
  },
  weekDay: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: 35,
    marginRight: 33,
    paddingBottom: 20,
    '&:last-child': {
      marginRight: 0
    }
  },
  weekDayName: {
    marginBottom: 3
  },
  checkbox: {
    '& img': {
      width: 30,
      height: 30
    }
  },
  dateIconWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 25,
    width: 36,
    height: 36,
    borderRadius: 50,
    background: 'white'
  },
  dateIcon: {
    width: 22,
    height: 24
  },
  allDayWrap: {
    display: 'flex',
    padding: '0px 28px 20px 28px'
  },
  allDayTitle: {
    marginLeft: 14,
    fontSize: 14,
    fontWeight: 'bold'
  }
}))

export default useStyles
