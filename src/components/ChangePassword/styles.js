import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  modal: {
    '& .MuiDialog-paperWidthSm': {
      width: 646,
      minHeight: 350
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
    padding: '20px 24px'
  },
  dialogActionsSecond: {
    height: '110px',
    justifyContent: 'space-between'
  },
  nextButton: {
    width: '160px',
    marginRight: '32px'
  },
  backButton: {
    width: '160px',
    marginLeft: '32px',
    color: theme.palette.black
  },
  closeButton: {
    position: 'absolute',
    right: '10px'
  },
  contentBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20
  },
  inputBox: {
    marginTop: 20
  }
}))

export default useStyles
