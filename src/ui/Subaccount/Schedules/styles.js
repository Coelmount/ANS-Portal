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
  },
  extraTitleBlockWrap: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 20
  },
  extraTitleBlockIconWrap: {
    width: 30,
    height: 30,
    background: theme.palette.primary.main,
    borderRadius: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    color: theme.palette.black,
    '&:hover': {
      cursor: 'pointer'
    },
    '& > svg': {
      width: 18,
      height: 18
    }
  },
  extraTitleBlockTitle: {
    whiteSpace: 'nowrap',
    fontSize: 14,
    fontFamily: 'MTN',
    fontStyle: 'normal',
    fontWeight: 500
  }
}))

export default useStyles
