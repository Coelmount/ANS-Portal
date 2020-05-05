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
    '& > *': {
      fontFamily: 'MTN',
      fontWeight: 700,
      fontSize: '24px',
      color: theme.palette.black
    },
    height: '90px',
    padding: '25px 44px'
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
    marginTop: 29,
    marginLeft: 44
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
  thead: {
    backgroundColor: theme.palette.active.main,
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
  toolbarWrap: {
    paddingLeft: 44
  },
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
  paginationIcon: {
    height: 12,
    position: 'absolute',
    top: 9,
    left: 7
  },
  paginationText: {
    fontWeight: 600
  }
}))

export default useStyles
