import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  roundButton: {
    width: 30,
    height: 30,
    minWidth: 30,
    padding: 0
  },
  titleBox: {
    display: 'flex',
    justifyContent: 'space-between',
    height: 25,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    borderLeft: '4px solid #00678F',
    paddingLeft: 10
  }
}))

export default useStyles
