import { makeStyles } from '@material-ui/core/styles'
import { borderRadius, textAlign, maxHeight } from '@material-ui/system'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiDialog-paperWidthSm': {
      width: '651px'
    },
    '& .MuiDialog-paperScrollPaper': {
      minHeight: '100%',
      maxHeight: '100%'
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
    padding: '20px 24px'
  },
  closeButton: {
    position: 'absolute',
    right: '10px'
  },
  updateButton: {
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
