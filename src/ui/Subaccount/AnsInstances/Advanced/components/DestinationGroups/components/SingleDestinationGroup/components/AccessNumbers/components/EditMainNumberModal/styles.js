import { makeStyles } from '@material-ui/core/styles/'

const useStyles = makeStyles(theme => ({
  mainTitle: {
    marginTop: 15,
    marginBottom: 5
  },
  rootUpdateMainNumber: {
    '& .MuiDialog-paperWidthSm': {
      width: '650px'
    },
    '& .MuiDialog-paperScrollPaper': {
      height: 540
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
  content: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    alignItems: 'center'
  },
  roundButtonEdit: {
    width: 30,
    height: 30,
    minWidth: 30,
    padding: 0,
    backgroundColor: 'white',
    boxShadow: '0px 4px 8px rgba(204, 204, 204, 0.25)',
    marginLeft: 10
  }
}))

export default useStyles
