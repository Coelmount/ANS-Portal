import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& .MuiDialog-paperWidthSm': {
      width: '651px'
    },
    '& .MuiDialog-paperScrollPaper': {
      minHeight: '100%'
    }
  },
  // Table overwrites =>
  paginationWrap: {
    left: '50%',
    bottom: 110,
    display: 'flex',
    position: 'absolute',
    transform: 'translate(-50%, 0)',
    background: '#F9F9F9',
    marginTop: 40,
    alignItems: 'center',
    marginBottom: 22,
    justifyContent: 'center'
  },
  toolbarWrap: {
    paddingLeft: 44
  },
  table: {
    marginTop: 38
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
    marginLeft: '30px'
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

  nextButton: {
    width: '160px',
    marginRight: '32px'
  },
  backButton: {
    width: '160px',
    marginLeft: '32px',
    color: theme.palette.black
  },

  dialogActionsSecond: {
    height: '110px',
    justifyContent: 'space-between'
  },
  entitlementsDialogContent: {
    padding: 0
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    boxShadow: 'none'
  },
  subtitle: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 29
  },
  setEntitlementsTitle: {
    marginLeft: 44,
    fontSize: 18,
    fontWeight: 600,
    fontFamily: 'MTN'
  }
}))

export default useStyles
