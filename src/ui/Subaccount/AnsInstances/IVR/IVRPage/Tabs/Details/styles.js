import { makeStyles } from '@material-ui/core/styles/'

const useStyles = makeStyles(theme => ({
  boxName: {
    marginTop: 40,
    display: 'flex',
    alignItems: 'center',
    width: '50%'
  },
  roundButtonEdit: {
    width: 30,
    height: 30,
    minWidth: 30,
    padding: 0,
    backgroundColor: 'white',
    boxShadow: '0px 4px 8px rgba(204, 204, 204, 0.25)',
    marginLeft: 18
  },
  inputIcon: {
    color: '#666666',
    height: 20,
    width: 20
  },
  editControlsButtons: {
    display: 'flex',
    fontFamily: 'MTN',
    alignItems: 'center',
    marginLeft: 30
  },
  roundEditControlsButton: {
    width: 30,
    height: 30,
    minWidth: 30,
    padding: 0,
    marginRight: 20
  },
  editBox: {
    display: 'flex',
    fontFamily: 'MTN',
    alignItems: 'center',
    marginTop: 36,
    justifyContent: 'flex-end',
    width: '50%'
  }
}))

export default useStyles
