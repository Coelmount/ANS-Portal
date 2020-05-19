import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  // Table overwrites =>
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
    paddingLeft: 44
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
  // checkboxCell: {
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   height: 'inherit',
  //   padding: 0,
  //   marginLeft: '30px'
  // },
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
  // <-

  select: {
    width: 254
  },
  indexHoverCheckbox: {
    cursor: 'pointer',
    width: 24,
    textAlign: 'center'
  },
  checkbox: {
    boxShadow: '0px 2px 4px rgba(204, 204, 204, 0.25)',
    width: '18px',
    height: '18px',
    marginRight: '9px',
    padding: 0,
    '& .MuiSvgIcon-root': {
      color: theme.palette.primary.main
    },
    '& .MuiIconButton-root': {
      padding: 0
    }
  },
  wrapper: {
    width: 254,
    marginTop: 40
  },
  modalDialog: {
    minHeight: '100%',
    '& .MuiDialog-paperScrollPaper': {
      minHeight: '100%'
    }
  },
  textLeft: {
    textAlign: 'left'
  },
  textCenter: {
    textAlign: 'center'
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
  stepStyles: {
    marginRight: 24,
    paddingLeft: 44,
    fontFamily: 'MTN',
    fontWeight: 500,
    fontSize: '16px',
    color: theme.palette.grey40
  },
  paragraphBox: {
    marginTop: '28px',
    marginLeft: '70px',
    fontFamily: 'MTN',
    fontWeight: 500,
    fontSize: '18px',
    color: theme.palette.black
  },
  secondParagraphBox: {
    marginTop: '34px',
    marginBottom: 16,
    marginLeft: '70px',
    fontFamily: 'MTN',
    fontWeight: 500,
    fontSize: '18px',
    color: theme.palette.black
  },
  inputes: {
    marginTop: '30px',
    marginLeft: 'calc(104px - 24px)'
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
  dialogActionsFirst: {
    height: '110px'
  },
  dialogActionsSecond: {
    height: '110px',
    justifyContent: 'space-between'
  },
  zipCityRow: {
    marginTop: '30px',
    marginLeft: 'calc(104px - 24px)',
    display: 'flex'
  },
  zip: {
    width: '35%',
    marginRight: '16px'
  },
  city: {
    width: '47%'
  },
  boxOfButtons: {
    paddingRight: '40px',
    paddingLeft: '40px',
    marginBottom: '40px',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  },
  leftButtonFromSP: {
    width: 224,
    color: theme.palette.black
  },
  rigthButtonFromSP: {
    width: '180px'
  },
  successDialog: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: ' space-between',
    alignItems: 'center'
  },
  successBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    marginRight: '94px',
    marginLeft: '94px'
  },
  successIconBox: {
    marginBottom: '28px'
  },
  successTitle: {
    whiteSpace: 'nowrap',
    fontFamily: 'MTN',
    fontSize: '24px',
    textAlign: 'center',
    marginBottom: '20px'
  },
  successInfo: {
    fontSize: '16px',
    textAlign: 'center'
  },
  successClose: {
    position: 'absolute',
    right: '10px',
    top: '10px'
  },
  girdTitle: {
    marginTop: '36px',
    marginBottom: '12px',
    fontWeight: 600,
    fontSize: '16px'
  },
  entitlementsHeader: {
    height: '50px',
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  entitlementsHeaderNumber: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: '14px',
    fontSize: '14px'
  },
  entitlementsHeaderName: {
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'MTN',
    fontSize: '18px',
    cursor: 'pointer'
  },
  entitlementsHeaderTotal: {
    fontSize: '16px'
  },
  entitlementsItemTitle: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 0 8px 0',
    borderBottom: '0.5px solid #E8E8E8',
    height: '66px',
    fontSize: '16px'
  },
  entitlementsItemTotal: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 0 8px 0',
    width: '50px',
    borderBottom: '0.5px solid #E8E8E8',
    height: '66px'
  },
  entitlementsItemInput: {
    width: '50px',
    '& .MuiOutlinedInput-root': {
      height: '50px'
    }
  },
  entitlementsGrid: {
    marginBottom: '24px'
  },
  entitlementsDialogContent: {
    padding: 0
  },
  root: {
    width: '100%'
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    boxShadow: 'none'
  },
  totalInput: {
    width: 70
  },
  subtitle: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 29
    // marginBottom: 40
  },
  secondStepSubtitle: {
    display: 'flex',
    marginTop: 29,
    marginBottom: 29,
    alignItems: 'center'
  },
  setEntitlementsTitle: {
    fontSize: 18,
    fontWeight: 600,
    fontFamily: 'MTN'
  },
  sortLabel: {
    '& svg': {
      marginTop: 10
    }
  },
  dataCells: {
    padding: 0
  },
  nextButtonEntitlements: {
    width: 240
  },
  boxOfButtonsSuccess: {
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'space-between',
    width: '100%',
    display: 'flex',
    marginBottom: 40
  },
  totalHeader: {
    padding: 0,
    '& span': {
      fontWeight: 600,
      fontSize: 16,
      '& > p': {
        height: 11
      },
      '& < svg': {
        marginTop: 11
      }
    },
    textAlign: 'center',
    width: 100
  },
  inputsWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  input: {
    width: 254,
    marginTop: 30
  },
  phoneAddedButtonWrap: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 25
  },
  okButton: {
    width: 160
  }
}))

export default useStyles
