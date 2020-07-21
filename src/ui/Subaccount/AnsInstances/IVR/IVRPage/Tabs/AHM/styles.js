import { makeStyles } from '@material-ui/core/styles/'

const useStyles = makeStyles(theme => ({
  scheduleIcon: {
    width: 16,
    height: 16
  },
  roundButton: {
    width: 30,
    height: 30,
    minWidth: 30,
    padding: 0,
    marginRight: 20
  },
  roundButtonEdit: {
    width: 30,
    height: 30,
    minWidth: 30,
    padding: 0,
    backgroundColor: 'white',
    boxShadow: '0px 4px 8px rgba(204, 204, 204, 0.25)'
  },
  schedulerTitle: {
    marginRight: 10,
    marginLeft: 10
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    borderBottom: '1px solid #E8E8E8',
    marginTop: 30,
    height: 40,
    paddingBottom: 20
  }
}))

export default useStyles
