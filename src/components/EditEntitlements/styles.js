import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  modalDialog: {
    '& .MuiDialog-paperScrollPaper': {
      minHeight: '100%'
    }
  },
  textCenter: {
    color: theme.palette.active.blue,
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
    right: '10px'
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
    marginTop: '19px',
    marginLeft: 'calc(88px - 24px)',
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
    //width: '392px'
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
    padding: '8px 40px'
  },
  root: {
    width: '100%'
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    boxShadow: 'none'
  },
  deleteModal: {
    '& .MuiDialog-paperWidthSm': {
      width: 646,
      minHeight: 350,
      display: 'flex',
      flexDirection: 'column',
      boxShadow: theme.shadows[5],
      outline: 'none',
      borderRadius: 3,
      background: theme.palette.active.main
    }
  },
  deleteHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 45,
    paddingRight: 40,
    height: 87,
    background: 'white'
  },
  deleteTitleBlock: {
    display: 'flex'
  },
  deleteTitle: {
    fontFamily: 'MTN',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 24,
    marginLeft: 14
  },
  closeIcon: {
    width: 26,
    height: 26,
    color: theme.palette.black,
    '&:hover': {
      cursor: 'pointer'
    }
  },
  deleteMain: {
    height: 263,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '55px 0px 23px 0px'
  },
  deleteMainText: {
    width: 450,
    marginLeft: 10
  },
  boldText: {
    fontWeight: 'bold'
  },
  deleteButtonsBlock: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end'
  },
  deleteButtonWrap: {
    width: 140,
    height: 50,
    background: theme.palette.primary.main,
    borderRadius: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'MTN',
    fontStyle: 'normal',
    fontWeight: 500,
    marginRight: 30,
    '&:hover': {
      backgroundColor: '#FEDF63',
      boxShadow: '0px 6px 5px rgba(204,204,204,0.25)',
      cursor: 'pointer'
    }
  },
  cancelButtonWrap: {
    width: 140,
    height: 50,
    background: 'white',
    borderRadius: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: `1px solid ${theme.palette.primary.main}`,
    fontFamily: 'MTN',
    fontStyle: 'normal',
    fontWeight: 500,
    marginRight: 30,
    '&:hover': {
      cursor: 'pointer'
    }
  },
  buttonTitle: {
    fontFamily: 'MTN',
    fontStyle: 'normal',
    fontWeight: 500
  },
  table: {
    // minWidth: 750
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  },
  bodyFirstCell: {
    paddingLeft: '37px'
  },
  checkboxHead: {
    paddingBottom: 0,
    paddingTop: 0,
    paddingLeft: 44
  },
  headCellTitle: {
    paddingLeft: 16,
    '& span': {
      fontWeight: 600,
      fontSize: 16,
      '& > p': {
        height: 11
      },
      '& < svg': {
        marginTop: 11
      }
    }
  },
  paginationHeadCell: {
    padding: 0,
    paddingBottom: 8,
    '& span': {
      fontWeight: 600,
      fontSize: 16,
      '& > p': {
        height: 11
      },
      '& < svg': {
        marginTop: 11
      }
    }
  },
  tbody: {
    '& td, th': {
      border: 'none',
      paddingLeft: 16
    }
  },
  link: {
    color: theme.palette.secondary.main,
    textDecoration: 'none',
    '&:focus': {
      color: '#598597'
    }
  },
  tableMessage: {
    paddingLeft: '24%',
    fontSize: 14
  },
  thead: {
    backgroundColor: theme.palette.active.main,
    '& th': {
      border: 'none'
    }
  },
  deleteCustomerIcon: {
    width: 20,
    height: 20,
    marginTop: 7,
    color: theme.palette.black,
    '&:hover': {
      cursor: 'pointer'
    }
  },
  tableRow: {
    height: '70px',
    borderLeft: '5px solid transparent',
    borderBottom: `1px solid ${theme.palette.greyE8}`,
    '&:first-child': {
      borderTop: `2px solid ${theme.palette.primary.main}`
    },
    '& > td': {
      width: 50
      //padding: '10px 16px',
      //paddingLeft: 44
    }
    // '&:nth-child(2n)': {
    //   backgroundColor: theme.palette.active.main,
    //   '&:hover': {
    //     borderLeft: `5px solid ${theme.palette.primary.main}`,
    //     backgroundColor: theme.palette.active.main
    //   }
    // },
    // '&:nth-child(2n+1)': {
    //   backgroundColor: 'white',
    //   '&:hover': {
    //     borderLeft: `5px solid ${theme.palette.primary.main}`,
    //     backgroundColor: 'white'
    //   }
    // }
  },
  tableRowWithoutBackground: {
    height: 76,
    borderLeft: '5px solid transparent',
    '&:first-child': {
      borderTop: `2px solid ${theme.palette.primary.main}`
    },
    '& > td': {
      padding: '10px 42px',
      paddingLeft: 44
    }
  },
  paginationWrap: {
    display: 'flex',
    background: theme.palette.active.main,
    alignItems: 'center',
    justifyContent: ' center',
    marginTop: 40,
    marginBottom: 22,
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%, 0)',
    bottom: 110
  },
  paginationIconBlock: {
    width: 30,
    height: 27,
    background: 'white',
    position: 'relative',
    margin: '0px 10px 0px 10px'
  },
  paginationIcon: {
    height: 12,
    position: 'absolute',
    top: 9,
    left: 7
  },
  paginationText: {
    fontWeight: 600
  },
  toolbarWrap: {
    display: 'flex',
    background: theme.palette.active.main,
    height: 50,
    justifyContent: 'flex-end'
  },
  searchWrap: {
    position: 'relative',
    marginRight: 20,
    marginLeft: 38.4
  },
  searchIcon: {
    position: 'absolute',
    top: 15,
    right: 20,
    color: theme.palette.black
  },
  perPageWrap: {
    display: 'flex',
    alignItems: 'center',
    '& .MuiInput-underline:before': {
      display: 'none'
    },
    '& .MuiInput-underline:after': {
      display: 'none'
    },
    '& .MuiSelect-select:focus': {
      background: 'none'
    }
  },
  perPageText: {
    fontSize: 14,
    whiteSpace: 'nowrap'
  },
  perPageSelect: {
    display: 'flex',
    alignItems: 'center',
    width: 66,
    height: 40,
    background: 'white',
    marginRight: 7,
    '& div': {
      paddingLeft: 16,
      paddingTop: 8,
      width: 66,
      fontSize: 14
    },
    '& svg': {
      color: theme.palette.active.blue,
      top: 11,
      right: 7
    }
  },
  MuiTableCell: {
    root: {
      padding: '10px 16px'
    }
  },
  deleteCell: {
    paddingRight: '38px !important'
  },
  searchInput: {
    width: 362,
    height: 50,
    padding: '0px 19px',
    border: 'none',
    boxShadow: '0px 4px 8px rgba(204, 204, 204, 0.25)',
    borderRadius: 3,
    '&:focus': {
      border: `2px solid ${theme.palette.primary.main}`,
      borderRadius: 3,
      outline: 'none'
    }
  },
  headCellContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'start',
    '& span': {
      position: 'relative',
      '& svg': {
        position: 'absolute',
        right: -30,
        top: 16
      }
    }
  },
  totalInput: {
    width: 70
  },
  subtitle: {
    display: 'flex',
    marginTop: 29,
    alignItems: 'center'
  },
  secondStepSubtitle: {
    display: 'flex',
    marginTop: 29,
    marginBottom: 29,
    alignItems: 'center'
  },
  setEntitlementsTitle: {
    fontSize: 18,
    fontWeight: 500,
    fontFamily: 'MTN'
  },
  checkbox: {
    paddingBottom: 0
  },
  sortLabel: {
    '& svg': {
      marginTop: 10
    }
  },
  dataCells: {
    padding: 0
  },
  checkboxCell: {
    padding: 0,
    marginLeft: 6
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
    textAlign: 'center'
  },
  totalCell: {
    display: 'flex',
    justifyContent: 'center',
    alignCenter: 'center',
    paddingBottom: 65
  }
}))

export default useStyles
