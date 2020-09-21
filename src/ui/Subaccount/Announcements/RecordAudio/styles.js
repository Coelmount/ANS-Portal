import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiDialog-paperWidthSm': {
      width: '651px'
    },
    '& .MuiDialog-paperScrollPaper': {
      minHeight: '100%',
      maxHeight: '100%'
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
    padding: '20px 44px'
  },
  closeButton: {
    position: 'absolute',
    right: '10px'
  },
  notSupprotedBrowserMessage: {
    marginTop: 270,
    textAlign: 'center'
  },
  helperTextWrap: {
    marginLeft: 20
  }
}))

export default useStyles
