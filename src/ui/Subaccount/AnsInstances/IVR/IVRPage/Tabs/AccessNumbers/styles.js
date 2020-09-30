import { makeStyles } from '@material-ui/core/styles/'

const useStyles = makeStyles(theme => ({
  mainTitle: {
    marginTop: 15,
    marginBottom: 5
  },
  rootUpdateMainNumber: {
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
  content: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    alignItems: 'center'
  },
  roundButtonEdit: {
    width: 30,
    height: 30,
    minWidth: 30,
    padding: 0,
    backgroundColor: 'white',
    boxShadow: '0px 4px 8px rgba(204, 204, 204, 0.25)',
    marginLeft: 10
  },
  checkbox: {
    paddingBottom: 0
  },
  indexHoverCheckbox: {
    cursor: 'pointer',
    width: 24,
    textAlign: 'center'
  },
  checkboxCell: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'inherit',
    padding: 0,
    marginLeft: '30px',
    '& > span': {
      marginLeft: '3px !important'
    }
  },
  rootSN: {
    '& .MuiDialog-paperWidthSm': {
      width: '651px'
    },
    '& .MuiDialog-paperScrollPaper': {
      minHeight: '100%'
    }
  },
  entitlementsDialogContent: {
    padding: 0
  },
  setEntitlementsTitle: {
    paddingLeft: 44,
    paddingTop: 37,
    fontSize: 18,
    fontWeight: 600,
    fontFamily: 'MTN'
  },
  countryInput: {
    width: 354,
    marginTop: 22,
    marginLeft: 44
    // marginBottom: 30
  },
  dialogActionsSecond: {
    height: '110px',
    justifyContent: 'space-between'
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
  roundButton: {
    width: 30,
    height: 30,
    minWidth: 30,
    padding: 0,
    marginRight: 10
  },
  addButtonBox: {
    marginTop: 40,
    display: 'flex',
    alignItems: 'center'
  },
  helperTextWrap: {
    margin: '0px 20px'
  },
  addSecondaryNumbersHelperTextWrap: {
    margin: '8px 44px'
  }
}))

export default useStyles
