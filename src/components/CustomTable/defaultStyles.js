import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
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
  // headCellTitle: {
  //   // paddingBottom: 0,
  //   paddingTop: 0,
  //   '& span': {
  //     fontWeight: 600,
  //     fontSize: 16
  //   }
  // },
  headCellTitle: {
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
    }
  },
  tbody: {
    '& td, th': {
      border: 'none',
      paddingLeft: 0
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
    borderLeft: '5px solid transparent',
    '& > td': {
      // width: 52,
      padding: '10px 16px'
    },
    '&:nth-child(2n)': {
      backgroundColor: theme.palette.active.main,
      '&:hover': {
        borderLeft: `5px solid ${theme.palette.primary.main}`,
        backgroundColor: theme.palette.active.main
      }
    },
    '&:nth-child(2n+1)': {
      backgroundColor: 'white',
      '&:hover': {
        borderLeft: `5px solid ${theme.palette.primary.main}`,
        backgroundColor: 'white'
      }
    }
  },
  paginationWrap: {
    display: 'flex',
    background: theme.palette.active.main,
    alignItems: 'center',
    margin: '32px 23px 27px 0px',
    float: 'right'
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
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 98,
    paddingLeft: 68,
    paddingRight: 33
  },
  searchWrap: {
    position: 'relative',
    marginRight: 20
  },
  clearResultIcon: {
    position: 'absolute',
    top: 15,
    right: 20,
    color: theme.palette.black,
    cursor: 'pointer'
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
      outline: `3px solid ${theme.palette.primary.main}`
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
  }
}))

export default useStyles
