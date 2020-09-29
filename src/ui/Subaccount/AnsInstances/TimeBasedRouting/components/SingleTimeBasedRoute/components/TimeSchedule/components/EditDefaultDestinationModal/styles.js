import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiDialog-paperWidthSm': {
      width: '651px'
    },
    '& .MuiDialog-paperScrollPaper': {
      minHeight: '85%'
    }
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    '& > *': {
      fontFamily: 'MTN',
      fontWeight: 700,
      fontSize: '24px',
      color: theme.palette.black
    },
    height: '90px',
    padding: '20px 40px'
  },
  closeButton: {
    position: 'absolute',
    right: '28px',
    top: 21,
    '& svg': {
      width: 27,
      height: 27
    }
  },
  periodFormsWrap: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
  },

  addPeriodTitle: {
    fontSize: 14,
    fontFamily: 'MTN',
    marginLeft: 9
  },
  dialogActions: {
    height: '110px',
    justifyContent: 'space-between'
  },
  backButton: {
    width: '160px',
    marginLeft: '32px',
    color: theme.palette.black
  },
  nextButton: {
    width: '160px',
    marginRight: '32px'
  },
  // modalContent: {
  //   paddingTop: 43,
  //   paddingLeft: 39
  // },
  nameInput: {
    marginBottom: 30
  },
  contentWrap: {
    height: 450,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputsWrap: {
    '& > div': {
      marginBottom: 30,
      width: 330
    },
    '& input': {
      width: '330px !important'
    }
  },
  helperTextWrap: {
    margin: '0px 20px'
  }
}))

export default useStyles
