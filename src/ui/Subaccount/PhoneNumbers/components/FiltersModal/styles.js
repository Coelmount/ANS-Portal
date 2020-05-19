import { makeStyles } from '@material-ui/core/styles'

const SUBTITLE_LEFT_MARGIN = 70
const CONTERN_LEFT_MARGIN = 94

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiDialog-paperWidthSm': {
      width: '651px'
    },
    '& .MuiDialog-paperScrollPaper': {
      minHeight: '100%'
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
    padding: 0
  },
  subtitle: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 58,
    marginBottom: 25,
    marginLeft: SUBTITLE_LEFT_MARGIN
  },
  subtitleText: {
    fontSize: 18,
    fontWeight: 600,
    fontFamily: 'MTN'
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
  countryInput: {
    width: 335,
    marginLeft: CONTERN_LEFT_MARGIN
  },
  radioWrap: {
    marginLeft: CONTERN_LEFT_MARGIN
  },
  nameTitle: {
    marginLeft: 12,
    marginRight: 5
  },
  statusContentContainer: {
    marginLeft: CONTERN_LEFT_MARGIN
  },
  statusContentRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '60%'
  },
  radioButton: {
    '&$checked': {
      color: theme.palette.primary.main
    }
  },
  checked: {}
}))

export default useStyles
