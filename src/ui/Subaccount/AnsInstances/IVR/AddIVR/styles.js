import { makeStyles } from '@material-ui/core/styles/'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiDialog-paperWidthSm': {
      width: '650px'
    },
    '& .MuiDialog-paperScrollPaper': {
      height: 540
    }
  },
  title: {
    '& > *': {
      fontFamily: 'MTN',
      fontWeight: 700,
      fontSize: '24px',
      color: theme.palette.black
    },
    height: '90px',
    padding: '25px 44px'
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 20,
    '& > span > svg': {
      width: 25,
      height: 25
    }
  },
  dialogContent: {
    padding: 0,
    position: 'relative'
  },
  dialogActions: {
    height: '110px',
    justifyContent: 'space-between'
  },
  cancelButton: {
    width: '160px',
    marginLeft: '32px',
    color: theme.palette.black
  },
  assignButton: {
    width: '160px',
    marginRight: '32px'
  },
  contentWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'absolute',
    top: '50%',
    transform: 'translate(50%, -50%)',
    right: '50%'
  },
  radioBoxWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginTop: 38
  },
  radioLabel: {
    fontWeight: 600,
    marginRight: 40
  },
  radioIcon: {
    width: 16,
    height: 16,
    backgroundColor: 'white',
    borderRadius: 100,
    boxShadow: '0px 2px 4px #C4C4C4'
  },
  checkedRadioIcon: {
    width: 16,
    height: 16,
    backgroundColor: 'white',
    borderRadius: 100,
    boxShadow: '0px 2px 4px #C4C4C4',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage: 'radial-gradient(#FFCC00,#FFCC00 40%,transparent 50%)',
      content: '""'
    }
  },
  helperTextWrap: {
    margin: '8px 44px'
  },
  loadingModal: {
    height: 340
  }
}))

export default useStyles
