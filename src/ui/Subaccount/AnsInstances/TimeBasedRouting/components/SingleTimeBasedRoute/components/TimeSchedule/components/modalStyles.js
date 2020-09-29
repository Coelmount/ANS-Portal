import { makeStyles } from '@material-ui/core/styles'

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
  addDestinationModalContent: {
    padding: '8px 44px',
    display: 'flex',
    flexDirection: 'column'
  },
  nameInput: {
    marginBottom: 30
  },
  // modalContent: {
  //   display: 'flex',
  //   justifyContent: 'center',
  //   paddingTop: 32
  // },
  formWrap: {
    width: 500,
    height: 370,
    border: `1px solid ${theme.palette.silver}`,
    borderRadius: 3
  },
  formTitleWrap: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    padding: '0px 22px',
    background: 'white',
    boxShadow: '0px 4px 8px rgba(204, 204, 204, 0.25)',
    borderRadius: 3
  },
  formTitleLabel: {
    fontSize: 16,
    fontWeight: 600
  },
  formContentWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 36,
    '& > div': {
      marginBottom: 30
    }
  },
  countryInput: {
    width: 354,
    marginTop: 22,
    marginLeft: 44
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
  table: {
    marginTop: 13
  },
  thead: {
    backgroundColor: 'white',
    '& th': {
      border: 'none'
    },
    height: 50,
    '& > tr': {
      height: 50
    }
  },
  tableRow: {
    height: '50px',
    borderLeft: '5px solid transparent',
    '& > td': {
      width: 50
    },
    '& > th': {
      height: 50
    },
    '&:nth-child(2n+1)': {
      backgroundColor: theme.palette.active.main,
      '&:hover': {
        borderLeft: `5px solid ${theme.palette.primary.main}`,
        backgroundColor: theme.palette.active.main
      }
    },
    '&:nth-child(2n)': {
      backgroundColor: 'white',
      '&:hover': {
        borderLeft: `5px solid ${theme.palette.primary.main}`,
        backgroundColor: 'white'
      }
    }
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
  bodyFirstCell: {
    paddingLeft: '37px'
  },
  checkboxHead: {
    paddingBottom: 0,
    paddingTop: 0,
    paddingLeft: 44
  },
  dialogActionsSecond: {
    height: '110px',
    justifyContent: 'space-between'
  },
  dialogContent: {
    padding: 0
  },
  freeNumberStep: {
    fontFamily: 'MTN',
    fontWeight: 500,
    fontSize: 16,
    color: theme.palette.grey40,
    marginBottom: 15
  },
  helperTextWrap: {
    marginBottom: 15
  }
}))

export default useStyles
