import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  dialogWrap: {
    minHeight: 350,
    '& .MuiDialog-paperScrollPaper': {
      minHeight: 350
    }
  },
  dialogTitleWrap: {
    paddingLeft: 45,
    paddingRight: 36,
    '& > h2': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  },
  dialogTitleContentWrap: {
    display: 'flex'
  },
  dialogTitleLabel: {
    marginLeft: 10,
    fontSize: 24,
    fontWeight: 700,
    fontFamily: 'MTN'
  },
  dialogTitleCloseIcon: {
    width: 27,
    height: 27,
    color: theme.palette.black,
    cursor: 'pointer'
  },
  dialogContentWrap: {
    padding: '31px 79px 49px 79px'
  },
  dialogActionsWrap: {
    background: theme.palette.active.main,
    boxShadow: 'none',
    padding: '23px 42px'
  },
  deleteButton: {
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
    color: theme.palette.black,
    '&:hover': {
      backgroundColor: '#FEDF63',
      boxShadow: '0px 6px 5px rgba(204,204,204,0.25)',
      cursor: 'pointer'
    }
  },
  cancelButton: {
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
    color: theme.palette.black,
    '&:hover': {
      cursor: 'pointer'
    }
  }
}))

export default useStyles
