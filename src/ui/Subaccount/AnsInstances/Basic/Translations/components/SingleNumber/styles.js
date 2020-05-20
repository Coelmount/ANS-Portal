import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    boxShadow: 'none'
  },
  inputsWrap: {
    display: 'flex',
    padding: '48px 68px',
    background: theme.palette.active.main
  },
  leftBlock: {
    display: 'flex',
    flexDirection: 'column'
  },
  rightBlock: {
    display: 'flex',
    flexDirection: 'column'
  },
  bottomInput: {
    marginTop: 31
  },
  arrowsIcon: {
    marginLeft: 14,
    marginRight: 60,
    marginBottom: 75
  },
  accessNumberWrap: {
    display: 'flex',
    alignItems: 'center'
  },
  editIconWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    marginLeft: 18,
    background: 'white',
    borderRadius: 100,
    boxShadow: '0px 4px 4px rgba(204, 204, 204, 0.25)',
    cursor: 'pointer'
  },
  buttonsWrap: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 43
  },
  buttonBlock: {
    display: 'flex',
    alignItems: 'center'
  },
  doneButtonBlock: {
    marginLeft: 22
  },
  doneIcon: {
    marginLeft: 2
  },
  buttonLabel: {
    fontSize: 14,
    fontFamily: 'MTN'
  },
  buttonIconWrap: {
    width: 30,
    height: 30,
    padding: 0,
    marginRight: 8
  },
  asignButtonWrap: {
    background: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main
    }
  },
  cancelButtonWrap: {
    background: theme.palette.black,
    '&:hover': {
      backgroundColor: theme.palette.black
    }
  },
  disabledButton: {
    backgroundColor: theme.palette.lightGrey,
    '&:hover': {
      backgroundColor: theme.palette.lightGrey,
      cursor: 'auto'
    }
  },
  assignIcon: {
    width: 19,
    height: 19,
    marginLeft: 2
  },
  cancelIcon: {
    width: 19,
    height: 19,
    color: 'white'
  }
}))

export default useStyles
