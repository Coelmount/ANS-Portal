import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  wrap: {
    width: 564,
    height: 244,
    background: 'grey'
  },
  header: {
    height: 50,
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '0px 17px',
    background: 'antiquewhite'
  }
}))

export default useStyles
