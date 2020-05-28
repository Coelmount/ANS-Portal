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
  addCustomerWrap: {
    display: 'flex',
    alignItems: 'center'
  },
  addIconButton: {
    minWidth: 30,
    width: 30,
    height: 30,
    borderRadius: 100,
    marginRight: 8,
    padding: 0
  },
  addTitleWrap: {
    position: 'relative'
  },
  addCustomerTitle: {
    marginRight: 10,
    fontSize: 14,
    fontStyle: 'normal',
    fontFamily: 'MTN',
    fontWeight: 500,
    whiteSpace: 'nowrap'
  },
  upArrowIcon: {
    position: 'absolute',
    right: -14,
    top: -3,
    color: theme.palette.active.blue
  },
  downArrowIcon: {
    position: 'absolute',
    right: -14,
    top: 5,
    color: theme.palette.active.blue
  },
  addPopoverWrap: {
    width: 300,
    height: 150
  },
  addPopoverItem: {
    height: '33%',
    padding: 24,
    '&:nth-child(1)': {
      borderBottom: `1px solid ${theme.palette.active.main}`
    },
    '& > a': {
      textDecoration: 'none'
    }
  },
  body: {
    '&.MuiPaper-elevation2': {
      boxShadow: 'none'
    },
    backgroundColor: theme.palette.active.main
  },
  editIcon: {
    height: 16,
    width: 20
  },
  rootToolbar: {
    marginLeft: 64,
    paddingTop: 24,
    paddingBottom: 34,
    '& .MTableToolbar-searchField-81': {
      paddingLeft: 0
    },
    '& .MuiFormControl-root': {
      width: 'auto'
    }
  },
  rootPagination: {
    border: 0,
    '& .MuiIconButton-root': {
      backgroundColor: 'white',
      width: 30,
      height: 30,
      borderRadius: 3,
      boxShadow: '0px 2px 4px rgba(196, 196, 196, 0.25)',
      margin: 10
    },
    '& .MuiTablePagination-input': {
      //display: 'none'
    }
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
  perPageText: {
    fontSize: 14,
    whiteSpace: 'nowrap'
  }
}))

export default useStyles
