import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  wrap: {
    width: 392,
    '& > div': {
      marginBottom: 30
    }
  },
  buttonIconsWrapper: {
    boxShadow: '0px 2px 4px rgba(196, 196, 196, 0.25)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 1,
    minWidth: 0,
    width: 27,
    height: 27,
    borderRadius: 20,
    marginLeft: 7,
    paddingLeft: 1,
    cursor: 'pointer'
  },
  contentTitleWrap: {
    // width: 392,
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 30
  },
  title: {
    fontSize: 16,
    fontWeight: 600
  },
  buttonsWrap: {
    // width: 392,
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 43
  },
  buttonBlock: {
    display: 'flex',
    alignItems: 'center'
  },
  buttonIconWrap: {
    width: 30,
    height: 30,
    padding: 0,
    marginRight: 8
  },
  cancelButtonWrap: {
    background: theme.palette.black,
    '&:hover': {
      backgroundColor: theme.palette.black
    }
  },
  cancelIcon: {
    width: 19,
    height: 19,
    color: 'white'
  },
  buttonLabel: {
    fontSize: 14,
    fontFamily: 'MTN'
  },
  disabledButtonLabel: {
    opacity: 0.5
  },
  doneButtonBlock: {
    marginLeft: 22
  },
  asignButtonWrap: {
    background: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main
    }
  },
  assignIcon: {
    width: 19,
    height: 19,
    marginLeft: 2
  },
  disabledButton: {
    backgroundColor: theme.palette.lightGrey,
    '&:hover': {
      backgroundColor: theme.palette.lightGrey,
      cursor: 'auto'
    }
  }
}))

export default useStyles
