import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  updateModal: {
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
  title: {
    fontFamily: 'MTN',
    fontSize: 24
  },
  button: {
    width: 140,
    height: 50,
    margin: '10px 30px 10px 0',
    color: theme.palette.black,
    fontFamily: 'MTN'
  }
}))

export default useStyles
