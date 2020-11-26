import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',

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
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0px 24px'
  },
  title: {
    fontSize: 24,
    fontStyle: 'normal',
    fontFamily: 'MTN',
    fontWeight: 600,
    marginLeft: 14
  },
  closeIcon: {
    width: 26,
    height: 26,
    color: theme.palette.black,
    cursor: 'pointer'
  },
  actionButtonsContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  actionButton: {
    width: 140,
    height: 50,
    display: 'flex',
    fontStyle: 'normal',
    alignItems: 'center',
    fontFamily: 'MTN',
    fontWeight: 500,

    borderRadius: 30,
    justifyContent: 'center',
    cursor: 'pointer'
  },
  cancelButton: {
    marginRight: 30,
    background: 'white',
    border: '1px solid #FFCC00'
  },
  deleteButton: {
    background: '#FFCC00',
    '&:hover': {
      background: '#FEDF63',
      boxShadow: '0px 6px 5px rgba(204,204,204,0.25)',
      cursor: 'pointer'
    }
  },
  disabledDeleteButton: {
    background: 'rgba(0, 0, 0, 0.12)',
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.12)',
      cursor: 'initial',
      boxShadow: 'none'
    }
  },
  actionButtonTitle: {
    fontStyle: 'normal',
    fontFamily: 'MTN',
    fontWeight: 500
  },
  mainContainer: {
    height: 250,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  deleteInput: {
    width: 200
  },
  confirmContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  secondConfirmText: {
    fontWeight: 'bold',
    margin: '0px 5px'
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '25px 0px'
  },
  contentContainer: {
    '& span': {
      fontSize: 16
    }
  },
  firstdeleteText: {
    fontWeight: 'bold'
  }
}))

export default useStyles
