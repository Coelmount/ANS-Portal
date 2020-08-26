import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiDialog-paperWidthSm': {
      width: '651px'
    },
    '& .MuiDialog-paperScrollPaper': {
      minHeight: 500
    }
  },
  ansNumberStepRoot: {
    '& .MuiDialog-paperWidthSm': {
      width: '651px'
    },
    '& .MuiDialog-paperScrollPaper': {
      minHeight: '100%'
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
  modalContent: {
    paddingTop: 43,
    paddingLeft: 39
  },
  nameInput: {
    marginBottom: 30
  },
  modalContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  freeNumberStep: {
    position: 'absolute',
    top: 16,
    left: 44,
    fontFamily: 'MTN',
    fontWeight: 500,
    fontSize: 16,
    color: theme.palette.grey40
  },
  inputsWrap: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& > div': {
      marginBottom: 30
    }
  },
  stepStyles: {
    margin: 16,
    fontFamily: 'MTN',
    fontWeight: 500,
    fontSize: 16,
    color: theme.palette.grey40
  },
  dialogActionsSecond: {
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
  countryInput: {
    width: 354,
    marginTop: 22,
    marginLeft: 44
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
  checkboxCell: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 'inherit',
    padding: 0,
    marginLeft: '30px',
    '& > span': {
      marginLeft: '3px !important'
    }
  },
  paginationWrap: {
    left: '50%',
    bottom: 110,
    display: 'flex',
    position: 'absolute',
    transform: 'translate(-50%, 0)',
    background: 'transparent',
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  toolbarWrap: {
    paddingLeft: 44,
    position: 'relative',
    height: 20
  },
  perPageWrap: {
    position: 'absolute',
    right: 30,
    top: -50
  },
  ansNumberStep: {
    fontFamily: 'MTN',
    fontWeight: 500,
    fontSize: 16,
    color: theme.palette.grey40,
    marginTop: 16,
    marginLeft: 18
  }
}))

export default useStyles
