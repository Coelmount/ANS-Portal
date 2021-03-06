import { makeStyles } from '@material-ui/core/styles/'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    boxShadow: 'none'
  },
  link: {
    color: theme.palette.secondary.main,
    textDecoration: 'none',
    '&:focus': {
      color: '#598597'
    }
  },
  idColStyles: {
    width: 100
  },
  deleteCell: {
    paddingRight: '38px !important'
  },
  deleteCustomerIcon: {
    width: 20,
    height: 20,
    marginTop: 7,
    color: theme.palette.black,
    '&:hover': {
      cursor: 'pointer'
    }
  }
}))

export default useStyles
